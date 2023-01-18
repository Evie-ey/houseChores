import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, StyleSheet, Keyboard, ActionSheetIOS, } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../../constants";
import { addDoc, collection, doc, FieldValue, Firestore, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from '../../../config';
import { TextInput, Card, Menu, Title, Button, Surface, Divider, List, Snackbar, } from 'react-native-paper';
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { addResident } from "../../data/redux/residents/reducer";
import { createUserWithEmailAndPassword } from "firebase/auth";

const NewResident = () => {
  // const residentsRef = firebase.firestore().collection('residents');
  const dispatch = useDispatch()
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const initialData = useState({
    "name": "",
    "email": "",
    "password": ""

  })

  const handleSubmit = async (values: any, actions: any) => {

    //  const timestamp = db.app.name.

    // ******

    try {

      createUserWithEmailAndPassword(auth, values.email, values.password)
      .then( async (userCredentials) => {
        const userId = userCredentials.user.uid

        // await db.collection('cities').doc('new-city-id').set(data);
        await setDoc(doc(db, "residents", userId), {"name": values.name, "email": values.email, "password": values.password})
        .then(() => setVisible(true))


        // .then((docu) => {
        //   console.log(docu, 'hhhhhhhhhhhh')
        //   // const docRef = doc(db, "residents", docu.id);
        //   // const docSnap = await getDoc(docRef);

        //   // if (docSnap.exists()) {
        //   //   console.log("Document data:", docSnap.data());
        //   //   dispatch(addResident)
        //   // } else {
        //   //   // doc.data() will be undefined in this case
        //   //   console.log("No such document!");
        //   // }

        // });

      })


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

      <Snackbar

                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                  label: '',
                  onPress: () => {
                    // Do something
                  },
                  color: "green"
                }}
                theme={{ colors: {surface: 'white', accent: 'green'},}}
                >
               Succssfully added resident
              </Snackbar>

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
