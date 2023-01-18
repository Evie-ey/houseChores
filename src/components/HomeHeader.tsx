import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { db } from "../../config";

import { COLORS, FONTS, SIZES, assets } from "../constants";
import { RootState } from "../data/store";

type THomeHeader = {
  onSearch: (value: any) => any,
}

const HomeHeader = ({ onSearch }: THomeHeader) => {
  const loggedIn: any = useSelector((state: RootState) => state.login.user);

  const [user, setUser] = useState('');


  const docRef = doc(db, "residents", loggedIn);
  getDoc(docRef).then(docResult => {

    let name: any = docResult.data() && docResult.data()
    setUser(name.name)
  })

  

  return (
    <View
      style={styles.cont}
    >

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}
        >
          Hello { user && user} 👋
        </Text>

        <View style={{ width: 45, height: 45 }}>
          <Image
            source={assets.person01}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
          <Image
            source={assets.badge}
            resizeMode="contain"
            style={{
              position: "absolute",
              width: 15,
              height: 15,
              bottom: 0,
              right: 0,
            }}
          />
        </View>
      </View>


      <View style={{ marginVertical: SIZES.font }}>



        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.white,
          }}
        >
          You have no unread notifications
        </Text>
      </View>
      <Divider style={{ backgroundColor: COLORS.gray }} />

      {/* <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >

          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder="Search NFTs"
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    // position: "absolute",
    // left: 80,
    // flexDirection: "row",
    // justifyContent: "space-around",
    // alignItems: "center",
    padding: SIZES.font,
    margin: 0,
  },
  text: {
    fontSize: 24,
    fontFamily: "nunito-bold",
    letterSpacing: 2,
  },
});

export default HomeHeader;
