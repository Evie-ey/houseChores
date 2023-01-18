import React, { useState } from "react";
import { View, SafeAreaView, FlatList, StyleSheet, Switch } from "react-native";
import { SimultaneousGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition";
import { Surface, Title, Text, Subheading, DataTable } from "react-native-paper";
import { useSelector } from "react-redux";

import { COLORS, NFTData, FONTS, SIZES, assets } from "../constants";
import { RootState } from "../data/store";
import { getGeneratedAssignments, getLoggedInUser, getRoomAssignments, updateGeneratedAssignments } from "../utils/firestoreFuntions";
import { fetchAreas } from "./area/Areas";

const Home = () => {
  const loggedIn: any = useSelector((state: RootState) => state.login.user);

  const [reassignments, setReassignments] = useState<any>([])
  const [logginUser, setLogginUser] = useState<any>('')

  const [switchEnabled, setSwitchEnabled] = useState(false);
  const toggleSwitch = async (status:any, week: any, assign:any) => {
    await updateGeneratedAssignments(status, week, assign)
    let newReschedules = await getGeneratedAssignments()
    setReassignments(newReschedules)

  }

  React.useEffect(() => {

    const fetchAssigns = async () => {
      let loggedInPerson = await getLoggedInUser(loggedIn)

      let newReschedules = await getGeneratedAssignments()

      setReassignments(newReschedules)


      setLogginUser(loggedInPerson)
    }

    fetchAssigns()


  }, []);



  console.log(logginUser, 'user')

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Title style={styles.title}>Upcoming schedules</Title>
      <Surface style={styles.surface}>
        {/* <Text>You have no upcoming schedule </Text> */}
      </Surface>

      {
          reassignments && Object.keys(reassignments).map((schedule: any) => (
            <Surface style={styles.surface} key={schedule}>
        <Surface>
          <Subheading style={{ ...styles.heading, ...styles.subheading }}>{schedule && schedule}</Subheading>
        </Surface>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Area</DataTable.Title>
            <DataTable.Title >Assigned To</DataTable.Title>
            <DataTable.Title >Status</DataTable.Title>
          </DataTable.Header>
          {
           reassignments[schedule].filter(((assign: any) => assign.assignee == logginUser && logginUser)).map((assign: any) => (
                <DataTable.Row key={assign.area}>
                <DataTable.Cell>{`${assign.area}`}</DataTable.Cell>
                <DataTable.Cell >{assign.assignee}</DataTable.Cell>
                <DataTable.Cell >
                  <View>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={assign.status ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={(val) => toggleSwitch(val, schedule, assign)}
                      value={assign.status}
                    />
                  </View>
                </DataTable.Cell>
            </DataTable.Row>


            ))
          }


          {/* <DataTable.Pagination
            page={page}
            numberOfPages={3}
            onPageChange={(page) => setPage(page)}
            label="1-2 of 6"
            numberOfItemsPerPageList={optionsPerPage}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
          /> */}
        </DataTable>
      </Surface>

          ))
      }

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
  },
  heading: {
    margin: 0,
    marginHorizontal: SIZES.large,
  },
  subheading: {
    padding: SIZES.small
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.lightGray
  },
});
export default Home;
