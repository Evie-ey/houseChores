import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Image, StatusBar, StyleSheet, } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../../constants";
import SelectDropdown from 'react-native-select-dropdown'

import { Button, DataTable, Headline, Subheading, Surface, Text, TextInput, } from 'react-native-paper';
import { useSelector } from "react-redux";
import { RootState } from "../../data/store";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { fetchResidentsData } from "../../data/redux/residents/reducer";
import { toOptions } from "../../utils/inputHelpers";
import { addAssignment } from "../../data/redux/assignments/reducer";
import { DatePickerModal } from "react-native-paper-dates";

const AreaDetails = () => {

  const areas = useSelector((state: RootState) => state.area.selectedArea);

  const residents = useSelector((state: RootState) => state.resident.data)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState(
    areas ? areas
      : {
          area: "",
          instructions: "",
          assignedTo: "",
          weekStart: "",
        }
  );


  // date
  const [range, setRange] = React.useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({ startDate: undefined, endDate: undefined });

  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }: any) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );

  useEffect(() => {
    const fetchResidents = async () => {
      const residentsRef = await getDocs(collection(db, 'residents'));

      const residents: any = []
      residentsRef.forEach((doc: any) => {
        const { name, email } = doc.data()
        residents.push({
          id: doc.id,
          name,
          email
        })
      })
      await dispatch(fetchResidentsData(residents))
    }

    fetchResidents()

  }, [])

  const handleSubmit = async (values: any, actions: any) => {

    console.log({...values, ...formData})

    try {
      const docRef = await addDoc(collection(db, "assignment",
      ), {
        ...values, ...formData
      })
        .then(async (docu) => {
          // const data = await getDocs(collection(db, 'areas', docu.id));
          const docRef = doc(db, "assignment", docu.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            dispatch(addAssignment(docSnap.data()))
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }

        });
      // console.log("Document written with ID: ", docRef.id);
      actions.resetForm()

    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  console.log(residents, 'residennnnnttts')

  const selectResidents = residents && residents.map(resident => resident.name)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        // initialValues={{
        //   "area": areas.area,
        //   "instructions": areas.instructions,
        //   "assignedTo": "",
        //   "weekStart": ""
        // }}
        initialValues={formData}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}

      >
        {(formikprops) => (
          <View style={styles.formContainer}>
            <View>
              <TextInput
                style={styles.input}
                label='Area'
                autoCapitalize="none"
                onChangeText={formikprops.handleChange("area")}
                value={formikprops.values.area}
              />
            </View>
            <View>

              <TextInput
                style={{ ...styles.input, ...styles.textarea }}
                label='Cleaning instructions'
                multiline={true}
                autoCapitalize="none"
                onChangeText={formikprops.handleChange("instructions")}
                value={formikprops.values.instructions}
              />
            </View>
            <View>
            <SelectDropdown
              data={residents && residents}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem.name, 'hehehe, selected')
                setFormData({...formData, ['assignedTo']: selectedItem.name})
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.name
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.name
              }}
            />
            </View>
            <View>
            <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        Pick range
      </Button>
      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        //   disabledDates: [new Date()] // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        // label="Select period" // optional
        // startLabel="From" // optional
        // endLabel="To" // optional
        // animationType="slide" // optional, default is slide on ios/android and none on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
        // closeIcon="close" // optional, default is "close"
        // editIcon="pencil" // optional, default is "pencil"
        // calendarIcon="calendar" // optional, default is "calendar"
      />
            </View>
            <View>
              <Button mode="contained" onPress={formikprops.handleSubmit}>
                ADD
              </Button>
            </View>

          </View>
        )}

      </Formik>

    </SafeAreaView>

  );
};



const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: SIZES.font,
    margin: 0,
  },
  formContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  menuContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  input: {
    // width: 350,
    // height: 55,
    // // backgroundColor: '#42A5F5',
    margin: 10,
    // padding: 8,
    color: 'black',
    // borderRadius: 14,
    // fontSize: 18,
    // fontWeight: '500',
  },
  textarea: {
    height: 150
  },
  surface: {
    margin: 0,
    marginHorizontal: SIZES.extraLarge,

  },
  searchContainer: {
    marginTop: SIZES.font,
    paddingHorizontal: SIZES.extraLarge,
    marginBottom: SIZES.extraLarge,
  }
});

export default AreaDetails;
