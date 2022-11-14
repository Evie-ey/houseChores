import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, StyleSheet, } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../../constants";

import { TextInput, Card, Menu, Title, Button, Surface, Divider, List, } from 'react-native-paper';
import { Formik } from "formik";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config";
import { useDispatch } from "react-redux";
import { addArea } from "../../data/redux/areas/reducer";



const NewArea = () => {
  const dispatch = useDispatch();

  const initialData = useState({
    "username": "",
    "email": "",

  })

  const handleSubmit = async (values: any, actions: any) => {

    //  const timestamp = db.app.name.

    try {
      const docRef = await addDoc(collection(db, "areas"), {
        ...values
      })
        .then(async (docu) => {
          // const data = await getDocs(collection(db, 'areas', docu.id));
          const docRef = doc(db, "areas", docu.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            dispatch(addArea)
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        initialValues={{
          "area": "",
          "instructions": "",
        }}
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

export default NewArea;
