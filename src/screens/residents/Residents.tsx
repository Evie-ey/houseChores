import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, StyleSheet, TextInput } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../../constants";
// to delete
// import { db } from '../config';
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Portal, Card, Menu, Title, Button, Surface, Divider, List, Snackbar, } from 'react-native-paper';
import { db } from "../../../config";
import { useDispatch } from "react-redux";
import { fetchResidentsData } from "../../data/redux/residents/reducer";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const fetchResidents = async () => {
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
  return residents

}

const Residents = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const [residents, setResidents] = useState<any>([])
  useEffect(() => {
    const getResidents = async () => {
      const residents = await fetchResidents()
      await dispatch(fetchResidentsData(residents))
      setResidents(residents)



    }

    getResidents()

  }, [])

  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const handleDelete = async (data: any) => {
    console.log(data, 'data')
    await deleteDoc(doc(db, "residents", data.id));
    setVisible(true)
   await fetchResidents()
  }


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
      <Surface style={styles.surface}>
        <View style={styles.menuContainer}>
          <FlatList
          data={residents}
          keyExtractor={item => item.email}
          renderItem ={ ({item}) =>
            <React.Fragment>
            <List.Item
              title={item.name}
              left={props => <List.Icon {...props} icon="account" />}
              right={props => <List.Icon {...props} icon="delete"  />}
              onPress={() => handleDelete(item)}

            />
            <Divider />

          </React.Fragment>
          }
          />
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
               Succssfully deleted resident
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
    marginHorizontal: SIZES.extraLarge,

  },
  searchContainer: {
    marginTop: SIZES.font,
    paddingHorizontal: SIZES.extraLarge,
    marginBottom: SIZES.extraLarge,
  }
});

export default Residents;
