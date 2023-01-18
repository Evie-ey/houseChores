import React from "react";
import { View, Text, SafeAreaView, Image, StatusBar, StyleSheet } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";

import { Portal, Card, Menu, Title, Button, Surface, Divider, Snackbar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../config";
import { signOut } from "firebase/auth";



const Settings = () => {
  const navigation = useNavigation();
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);


  const signOutResident = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setVisible(true)
      navigation.navigate('Login' as never)
    }).catch((error) => {
      // An error happened.
    });
  }
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Surface style={styles.surface}>
        <View style={styles.menuContainer}>
          <Menu.Item icon="account-group" onPress={() => navigation.navigate('Residents' as never)} title="Residents" />
          <Divider />
          <Menu.Item icon="air-filter" onPress={() => navigation.navigate('Areas' as never)} title="Areas" />
          <Divider />
          <Menu.Item icon="store-settings" onPress={() => { }} title="Settings" disabled />
          <Divider />
          <Menu.Item icon="content-copy" onPress={() => { }} title="Help & Support" disabled />
          <Divider />
          <Menu.Item icon="logout" onPress={signOutResident} title="Log out" />
        </View>
      </Surface>

      <Snackbar

        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: '',
          onPress: () => {
            // Do something
          },
          color: "green"
        }}>
       Logout Successful
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
  menuContainer: {
    // flex: 1,
    // justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  surface: {
    margin: 0,
    marginHorizontal: SIZES.medium,
    // backgroundColor: "red",
    // height: "100%",
  },
});

export default Settings;

