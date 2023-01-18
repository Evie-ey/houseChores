import { Formik } from "formik"
import React, { useEffect } from "react"
import * as yup from "yup";
import { KeyboardAvoidingView, StyleSheet, View, Text, TouchableOpacity, } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { black } from "react-native-paper/lib/typescript/styles/colors"

import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../../config"
import { reqEmail, reqMsg, reqString } from "../validations";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { login } from "../data/coreReducer";

const schema = yup.object().shape({
  email: reqEmail,
  password: reqString
});

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if(user) {
        console.log(user)

        dispatch(login(user.uid))
        navigation.navigate('HomeNavigation' as never)
      }
    })
    return unsubscribe
  }, [])
  const handleSubmit = (values: any, actions: any) => {
    console.log("hello")
      // createUserWithEmailAndPassword(auth, values.email, values.password)
      // .then(userCredentials => {
      //   const user = userCredentials.user
      //   console.log(user)
      // })
      // .catch(error => alert(error))

      signInWithEmailAndPassword(auth, values.email, values.password)
      .then(userCredentials => {
        const user = userCredentials.user;
        dispatch(login(userCredentials.user.uid))
        navigation.navigate('HomeNavigation' as never)

      })
      .catch(error => alert(error.message))
  }

  const handleSubmitLogin = (values: any, actions: any) => {

      // createUserWithEmailAndPassword(auth, values.email, values.password)
      // .then(userCredentials => {
      //   const user = userCredentials.user
      //   console.log(user)
      // })
      // .catch(error => alert(error))
  }


  return (
      <Formik
        initialValues={{
          "email": "",
          "password": ""
        }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)

        }}
        validationSchema={schema}

      >
        {(formikprops) => (
          <KeyboardAvoidingView style={styles.container}>

          <View  style={{...styles.inputContainer, marginBottom: 100, alignItems:"center"}}>
            <Text style={{fontSize: 30, fontWeight: "bold"}}>Welcome to Chores</Text>
            <Text>Please enter your details</Text>
          </View>

            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              label='email'
              autoCapitalize="none"
              onChangeText={formikprops.handleChange("email")}
              value={formikprops.values.email}
            />
            </View>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              label='Password'
              secureTextEntry
              autoCapitalize="none"
              onChangeText={formikprops.handleChange("password")}
              value={formikprops.values.password}
            />
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=> formikprops.handleSubmit()} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            </View>
            <View style={{paddingTop: 25}}><Text>Dont have an account? Contact admin</Text></View>

            {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=> formikprops.handleSubmit()} style={[styles.button, styles.buttonOutline]}>
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>

            </View> */}
            </KeyboardAvoidingView>

        )}

      </Formik>



  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonContainer: {

    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})

