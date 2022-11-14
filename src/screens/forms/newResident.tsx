import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, StyleSheet, Keyboard, ActionSheetIOS, } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../../constants";
import { addDoc, collection, doc, FieldValue, Firestore, getDoc } from "firebase/firestore";

import { db } from '../../../config';
import { TextInput, Card, Menu, Title, Button, Surface, Divider, List, } from 'react-native-paper';
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { addResident } from "../../data/redux/residents/reducer";

const NewResident = () => {
  // const residentsRef = firebase.firestore().collection('residents');
  const dispatch = useDispatch()

  const initialData = useState({
    "name": "",
    "email": "",
    "password": ""

  })

  const handleSubmit = async (values: any, actions: any) => {

    //  const timestamp = db.app.name.

    try {
      const docRef = await addDoc(collection(db, "residents"), {
        ...values
      })
        .then(async (docu) => {
          // const data = await getDocs(collection(db, 'areas', docu.id));
          const docRef = doc(db, "residents", docu.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            dispatch(addResident)
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }

        });

      actions.resetForm()

    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        initialValues={{
          "name": "",
          "email": "",
          "password": ""
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
                label='Username'
                autoCapitalize="none"
                onChangeText={formikprops.handleChange("name")}
                value={formikprops.values.name}
              />
            </View>
            <View>

              <TextInput
                style={styles.input}
                label='Password'
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={formikprops.handleChange("password")}
                value={formikprops.values.password}
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                label='Email'
                autoCapitalize="none"
                onChangeText={formikprops.handleChange("email")}
                value={formikprops.values.email}
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

export default NewResident;
