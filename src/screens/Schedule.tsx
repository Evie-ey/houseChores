import React, { useState } from "react";
import { View, SafeAreaView, Image, StatusBar, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { RootState } from "../data/store";

import { DataTable, Headline, Subheading, Surface, Text,Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config";
import { addAssignment, fetchAssignmentData } from "../data/redux/assignments/reducer";
import { fetchAreas } from "./area/Areas";
import { fetchResidents } from "./residents/Residents";
import { getGeneratedAssignments, getIndividualmaps, getRoomAssignments, getRoomPosition, updateNextAssignment } from "../utils/firestoreFuntions";
import { toGnerateSchedules } from "../utils/fetchData";
import { DatePickerModal } from "react-native-paper-dates";
import { getDay } from "../utils/getDay";
// import { toGnerateSchedules } from "../utils/fetchData";
let generatedAssignments = doc(db, "generateAssignments", "generatedSchedule");

const Schedule = () => {



  const dispatch = useDispatch();
  const [assigns, setAssigns] = useState<any>([])
  const [schedules, setSchedules] = useState()

  const [rangeCheck, setRangeCheck] = useState('')
  const [wrongDay, setWrongDay] = useState(true)
  const [scheduleExixst, SetscheduleExixst] = useState(false)

  const [range, setRange] = React.useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({ startDate: undefined, endDate: undefined });

  const [open, setOpen] = React.useState(false);

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [reassignments, setReassignments] = useState<any>([])


  // getDoc(individualMaps).then(r => {console.log(r.data(), 'bamange promise')})
  let books = ['kkkk','hjgkg']
  // updateDoc(assignedRooms, {
  //   'assignedRooms': arrayUnion(...books)
  // })
  // const frankDocRef = doc(db, "users", "frank");
  // setDoc(individualMaps, {
  //   'individualMaps': {'blue': ["Kitt"]}
  // }, { merge: true });
  // setDoc(roomAssignments, {
  //   'week1': {'Evss': arrayUnion(...["Kiop"])}
  // }, { merge: true });

  // arrayUnion("greater_virginia")

  React.useEffect(() => {


    // const docRef = await addDoc(collection(db, "areas"), {
    //   ...values
    // })
    // toGnerateSchedules()


    const fetchGeneratedAssigns = async () => {
      let assigns = await getGeneratedAssignments()
      setSchedules(assigns)
      setReassignments(assigns)


      // let individualMaps: any = await getIndividualmaps();
      // console.log(assigns, 'goodness')
      // console.log(individualMaps, 'goodness')

      // setReassignments(assigns)

      // await dispatch(fetchAssignmentData(assigns))
    }

    fetchGeneratedAssigns()

  }, []);

  const fetchAssigns = async () => {


    let getAreas: any = await fetchAreas()
    getAreas = getAreas.map((room:any) => room.area)

    let schedules:any = await getRoomAssignments()

    let newReschedules = []

    for (let schedule in schedules) {
      let count = 0;
      let reschedule: any = {}
      let reassign: any = []
      while (count < getAreas.length) {
        for(const i in schedules[schedule]){
          if(schedules[schedule][i].includes(getAreas[count])) {
            reassign.push({area:getAreas[count], assignee: i, status:false})
          }
        }

        count ++

      }
      reschedule[schedule] = reassign

      setDoc(generatedAssignments, {
        "generatedSchedule": reschedule
      }, { merge: true });

      newReschedules.push(reschedule)

    }


    setSchedules(schedules)

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


    await dispatch(fetchAssignmentData(assigns))
  }



  // date

  async  function handleSubmit() {
    console.log(schedules, 'schedules')
    let dates: any = schedules && Object.keys(schedules)
    console.log(dates, '---',rangeCheck, "sorry cant")
    if( dates.includes(rangeCheck )) {
      SetscheduleExixst(true)
      setWrongDay(true)
      setVisible(true)

      console.log("sorry cant")
  } else {
    await toGnerateSchedules(rangeCheck)
    // sending formatted schedules to firebase
    await fetchAssigns()

    // fetching sent data
    let reassigns = await getGeneratedAssignments()
    setReassignments(reassigns)
  }


  }
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }: any) => {

      if(getDay(startDate) == "Monday" && getDay(endDate) == "Sunday") {

        let startDateMod = startDate.toISOString().split('T')[0]
        let endDateMod= endDate.toISOString().split('T')[0]
        setOpen(false);
        setRange({ startDate, endDate });
        setRangeCheck(`${startDateMod}-${endDateMod}`)

        setWrongDay(false)


      }




      console.log(range, 'range')
    },
    [setOpen, setRange]
  );

  const checkDate = () => {
    console.log(range)
  }


  const assignments = useSelector((state: RootState) => state.assignmnent.data);



  return (
    <View>
      <Surface style={styles.surface}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => setOpen(true)} style={[styles.button, styles.buttonOutline]}>
      <Text style={styles.buttonOutlineText}>Pick Monday - Sunday</Text>
      </TouchableOpacity>
      {!!wrongDay && (
            <Text style={{paddingLeft: 15, fontSize: 10}}>{wrongDay}</Text>
          )}

      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
        validRange={{
          startDate: new Date(),  // optional
          // endDate: new Date(), // optional
          // disabledDates: [new Date()] // optional
        }}
        // onChange={checkDate} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        // label="Select period" // optional
        // startLabel="From" // optional
        // endLabel="To" // optional
        // animationType="slide" // optional, default is slide on ios/android and none on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
        // closeIcon="close" // optional, default is "close"
        // editIcon="pencil" // optional, default is "pencil"
        // calendarIcon="calendar" // optional, default is "calendar"
      />
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => handleSubmit()} style={[styles.button, wrongDay ? styles.buttonOutlineGreyed : styles.buttonOutline]} disabled={wrongDay}>
      <Text style={wrongDay ? styles.buttonOutlineTextGreyed: styles.buttonOutlineText}>Generate Schedule</Text>
      </TouchableOpacity>

      </View>

        {/* <Headline style={styles.heading}>November</Headline> */}
      </Surface>
      <View style={{ height: "auto", maxHeight: "100%"}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {
          reassignments && Object.keys(reassignments).map((schedule: any) => (
            <Surface style={styles.surface} key={schedule}>
        <Surface>
          <Subheading style={{ ...styles.heading, ...styles.subheading }}>{ schedule && schedule}</Subheading>
        </Surface>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Area</DataTable.Title>
            <DataTable.Title >Assigned To</DataTable.Title>
            <DataTable.Title >Status</DataTable.Title>
          </DataTable.Header>
          {
           reassignments[schedule].map((assign: any) => (
                <DataTable.Row key={assign.area}>
                <DataTable.Cell>{`${assign.area}`}</DataTable.Cell>
                <DataTable.Cell >{assign.assignee}</DataTable.Cell>
                <DataTable.Cell >

                  {assign.status ? <Text style={{color: "green"}}>Done</Text> : <Text style={{color: "red"}}>Not Done</Text>}
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
     </ScrollView>
     </View>

      <Surface>
      <Snackbar

        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: '',
          onPress: () => {
            // Do something
          },
          color: "red"
        }}>
        Sorry, schedule already exists
      </Snackbar>
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
  buttonOutlineGreyed: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'rgba(0, 0, 0, 0.29)',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineTextGreyed: {
    color: 'rgba(0, 0, 0, 0.32)',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 18,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

});

export default Schedule;


