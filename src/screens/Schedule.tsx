import React from "react";
import { View, SafeAreaView, Image, StatusBar, StyleSheet, } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";


import { DataTable, Headline, Subheading, Surface, Text, } from 'react-native-paper';

const optionsPerPage: any = [2, 3, 4];




const Schedule = () => {

  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

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

          <DataTable.Row>
            <DataTable.Cell>Toiltes</DataTable.Cell>
            <DataTable.Cell >Eva</DataTable.Cell>
            <DataTable.Cell >In Progress</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Kitchen</DataTable.Cell>
            <DataTable.Cell >Charity</DataTable.Cell>
            <DataTable.Cell >In Progress</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Bathroom</DataTable.Cell>
            <DataTable.Cell >Angellina</DataTable.Cell>
            <DataTable.Cell >In Progress</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Stairs & Hallway</DataTable.Cell>
            <DataTable.Cell >Anastasia</DataTable.Cell>
            <DataTable.Cell >In Progress</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Sitting Area</DataTable.Cell>
            <DataTable.Cell >OOna</DataTable.Cell>
            <DataTable.Cell >In Progress</DataTable.Cell>
          </DataTable.Row>

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

          <DataTable.Row>
            <DataTable.Cell>Toiltes</DataTable.Cell>
            <DataTable.Cell >Eva</DataTable.Cell>
            <DataTable.Cell >In Progress</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Kitchen</DataTable.Cell>
            <DataTable.Cell >Charity</DataTable.Cell>
            <DataTable.Cell >In Progress</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Bathroom</DataTable.Cell>
            <DataTable.Cell >Angellina</DataTable.Cell>
            <DataTable.Cell >In Progress</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Stairs & Hallway</DataTable.Cell>
            <DataTable.Cell >Anastasia</DataTable.Cell>
            <DataTable.Cell >In Progress</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Sitting Area</DataTable.Cell>
            <DataTable.Cell >OOna</DataTable.Cell>
            <DataTable.Cell >In Progress</DataTable.Cell>
          </DataTable.Row>

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
    backgroundColor: "red",

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
