import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, StyleSheet, TextInput } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../../constants";

import { Portal, Card, Menu, Title, Button, Surface, Divider, List, } from 'react-native-paper';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IArea } from "./types";
import { IState } from "../../data/types";
import { AreaState, fetchAreaData } from "../../data/redux/areas/reducer";
import { RootState } from "../../data/store";



const Areas = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchAreas = async () => {
      // const data = await getDocs(collection(db, 'areas', 'C7HdsbiFACcN1kCYrcjL'));
      


      const areasRef = await getDocs(collection(db, 'areas'));

      const areas: any = []
      areasRef.forEach((doc: any) => {
        const { area, instructions } = doc.data()

        areas.push({
          id: doc.id,
          area,
          instructions
        })
      })
      await dispatch(fetchAreaData(areas))
    }

    fetchAreas()

  }, [])

  const areas = useSelector((state: RootState) => state.area.data);


  console.log(areas, 'areassss')


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.searchContainer}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.lightGray,
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
            placeholder="Search Residents"
            style={{ flex: 1 }}
            onChangeText={() => 'hello'}
          />
        </View>
      </View>

      <View style={styles.menuContainer}>
        {
          areas && areas.map((res: any) => (
            <Surface style={styles.surface} key={res.area}>
              <List.Item
                title={res.area}
                left={props => <List.Icon {...props} icon="bathtub" />}
                right={props => <List.Icon {...props} icon="arrow-right" />}
              />
              <Divider />
            </Surface>
          ))
        }

      </View>
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
    // justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  surface: {
    margin: 0,
    marginHorizontal: SIZES.extraLarge,
    marginBottom: SIZES.large,

  },
  searchContainer: {
    marginTop: SIZES.font,
    paddingHorizontal: SIZES.extraLarge,
    marginBottom: SIZES.extraLarge,
  }
});

export default Areas;
