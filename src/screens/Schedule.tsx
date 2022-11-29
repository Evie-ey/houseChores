import React, { useState } from "react";
import { View, SafeAreaView, Image, StatusBar, StyleSheet, } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { RootState } from "../data/store";

import { DataTable, Headline, Subheading, Surface, Text, } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config";
import { addAssignment, fetchAssignmentData } from "../data/redux/assignments/reducer";

const optionsPerPage: any = [2, 3, 4];



const Schedule = () => {

  const dispatch = useDispatch();
  const [assigns, setAssigns] = useState<any>([])

  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    const fetchAssigns = async () => {
      // const data = await getDocs(collection(db, 'areas', 'C7HdsbiFACcN1kCYrcjL'));w

      const assignsRef = await getDocs(collection(db, 'assignment'));

      const assigns: any = []
      assignsRef.forEach((doc: any) => {
        const { area, instructions, assignedTo } = doc.data()

        assigns.push({
          id: doc.id,
          area,
          instructions,
          assignedTo,
        })
      })

      console.log(assigns, 'now in array')
      await dispatch(fetchAssignmentData(assigns))
    }

    fetchAssigns()

  }, []);
  const assignments = useSelector((state: RootState) => state.assignmnent.data);
  console.log(assignments, 'assignmentssss')
  return (
    <View>

      <Surface style={styles.surface}>
        <Headline style={styles.heading}>November</Headline>
      </Surface>
      <Surface style={styles.surface}>
        <Surface>
          <Subheading style={{ ...styles.heading, ...styles.subheading }}>Week Starting 01/11/2022</Subheading>
        </Surface>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Area</DataTable.Title>
            <DataTable.Title >Assigned To</DataTable.Title>
            <DataTable.Title >Status</DataTable.Title>
          </DataTable.Header>
          {
            assignments && assignments.map(assign => (
                <DataTable.Row key={assign.id}>
                <DataTable.Cell>{assign.area}</DataTable.Cell>
                <DataTable.Cell >{assign.assignedTo}</DataTable.Cell>
                <DataTable.Cell >In Progress</DataTable.Cell>
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


    </View>
  );
};

const styles = StyleSheet.create({

  surface: {
    margin: 0,
    marginHorizontal: SIZES.large,
    marginVertical: SIZES.small,

  },
  heading: {
    margin: 0,
    marginHorizontal: SIZES.large,
  },
  subheading: {
    padding: SIZES.small
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.lightGray
  }

});

export default Schedule;
