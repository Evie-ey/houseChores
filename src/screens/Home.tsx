import React, { useState } from "react";
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { SimultaneousGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition";
import { Surface, Title, Text } from "react-native-paper";

import { NFTCard, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS, NFTData, FONTS, SIZES, assets } from "../constants";

const Home = () => {
  const [nftData, setNftData] = useState(NFTData);

  const handleSearch = (value: any) => {
    if (value.length === 0) {
      setNftData(NFTData);
    }

    const filteredData = NFTData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setNftData(NFTData);
    } else {
      setNftData(filteredData);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Title style={styles.title}>Upcoming schedules</Title>
      <Surface style={styles.surface}>
        <Text>You have no upcoming schedule </Text>
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
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  surface: {
    padding: SIZES.extraLarge,
    marginHorizontal: SIZES.medium,
  },

  title: {
    marginHorizontal: SIZES.medium,
  }
});
export default Home;
