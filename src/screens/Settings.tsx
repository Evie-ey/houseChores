import React from "react";
import { View, Text, SafeAreaView, Image, StatusBar, StyleSheet } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";

import { Portal, Card, Menu, Title, Button, Surface, Divider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";



const Settings = () => {
  const navigation = useNavigation();
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
          <Menu.Item icon="logout" onPress={() => { }} title="Log out" />
        </View>
      </Surface>

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
