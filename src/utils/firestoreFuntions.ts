import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config";
import { fetchAreas } from "../screens/area/Areas";
import { fetchResidents } from "../screens/residents/Residents";


let individualMaps = doc(db, "generateAssignments", "individualMaps");
let nextAssignment = doc(db, "generateAssignments", "nextAssignment");
let roomPosition = doc(db, "generateAssignments", "roomPosition");
let assignedRooms = doc(db, "generateAssignments", "assignedRooms");
let completelyAssigned = doc(db, "generateAssignments", "completelyAssigned");
let roomAssignments = doc(db, "generateAssignments", "roomAssignments");
let generatedAssignments = doc(db, "generateAssignments", "generatedSchedule");

export const resetAssignedRooms = async () => {
  await setDoc(doc(db, "generateAssignments", "assignedRooms"), {
    "assignedRooms": []
  });

  return await getAssignedRoom()
}

export const getCompletelyAssigned = async () => {
  const compAssigned = await getDoc(completelyAssigned)
  let compAssignedArray = []
  if (compAssigned.exists()) {
    compAssignedArray = compAssigned.data().completelyAssigned;

  } else {

    console.log("No such document!");
  }

  return compAssignedArray
}




export const updateCompletelyAssigned = async (individuals: any) => {
  await updateDoc(completelyAssigned, {
    completelyAssigned: arrayUnion(individuals)
})
return await getCompletelyAssigned();
}

export const getAssignedRoom = async () => {
  const assRoom = await getDoc(assignedRooms)
  let assignedRoomArray = []
  if (assRoom.exists()) {
    assignedRoomArray = assRoom.data().assignedRooms;

  } else {

    console.log("No such document!");
  }

  return assignedRoomArray;
}

export const updateAssignedRooms = async (rooms: any) => {

  await updateDoc(assignedRooms, {
    assignedRooms: arrayUnion(rooms)
})

  return await getAssignedRoom()
}

export const getNextAssignment = async () => {
  const nextAssign = await getDoc(nextAssignment);
  let assign = 0
  if (nextAssign.exists()) {
    assign = nextAssign.data().nextAssignment;

  } else {

    console.log("No such document!");
  }

  return assign

}

export const updateNextAssignment = async (update: number) => {
  await updateDoc(nextAssignment, {
    'nextAssignment': update
  })
  return await getNextAssignment()

}

export const getRoomPosition = async () => {
  const getRoom = await getDoc(roomPosition);
  let room = 0
  if (getRoom.exists()) {
    room = getRoom.data().roomPosition;

  } else {

    console.log("No such document!");
  }

  return room
}

export const updateRoomPosition = async (update: number) => {
  updateDoc(roomPosition, {
    'roomPosition': update
  })
  return await getRoomPosition()
}

export const getIndividualmaps = async () => {
  const getIndividual = await getDoc(individualMaps);
  let individuals = undefined
  if (getIndividual.exists()) {
    individuals  = getIndividual.data().individualMaps;

  } else {

    console.log("No such document!");
  }


  return individuals

}

export const updateIndividualMaps = async (individual: any, value: any) => {
  const maps = await getIndividualmaps()

  let data:any = {}
  if(individual in maps) {
    data[individual] = arrayUnion(...value)
    setDoc(individualMaps, {
    'individualMaps': data
  }, { merge: true });
  } else {
    data[individual] = value
    setDoc(individualMaps, {
      'individualMaps': data
    }, { merge: true });
  }

  return await getIndividualmaps()


}

export const resetIndividualMaps = async () => {
  await setDoc(doc(db, "generateAssignments", "individualMaps"), {
        "individualMaps": {}
      });

  return await getIndividualmaps()
}

export const resetCompletelyAssigned = async () => {
  await setDoc(doc(db, "generateAssignments", "completelyAssigned"), {
    "completelyAssigned": []
  });

  return await getCompletelyAssigned()
}

export const getRoomAssignments = async () => {
  const getRoomAssignment = await getDoc(roomAssignments);
  let assignments = undefined
  if (getRoomAssignment.exists()) {
    assignments  = getRoomAssignment.data().roomAssignments

  } else {

    console.log("No such document!");
  }


  return assignments

}
export const updateRoomAssignment = async (week: any, individual: any, room: any ) => {
  const maps: any = await getRoomAssignments()
  let data: any = {}
  data[week] = {}
  if(week in maps) {
    console.log(data[week], 'week here')
    if( individual in maps[week]) {
      data[week][individual] = arrayUnion(...room)
    }
    else {
      console.log(data[week], 'okay here we are')
      data[week][individual] = room
    }
  } else {
    data[week][individual] = room
  }
  setDoc(roomAssignments, {
    'roomAssignments': data
  }, { merge: true });


  return await getRoomAssignments()
}


export const getLoggedInUser = async (loggedIn: any) => {
  let user = undefined
  const docRef = doc(db, "residents", loggedIn);
  let getuser = await getDoc(docRef)

  if(getuser.exists()) {
    user = getuser.data().name
  }

  return user

}

export const getGeneratedAssignments = async () => {
  const getSchedules = await getDoc(generatedAssignments);
  let assignments = undefined
  if (getSchedules.exists()) {
    assignments  = getSchedules.data().generatedSchedule;

  } else {

    console.log("No such document!");
  }

  return assignments

}

export const updateGeneratedAssignments = async (status: boolean, week: any, switchassign: any) => {
  const getSchedules = await getGeneratedAssignments()
  let newSchedule: any = {}
let asses = getSchedules[week]
console.log(getSchedules, week, 'here athey are')

let obj = asses.filter((assign: any) => assign.area != switchassign.area)
let updated = {area: switchassign.area, assignee: switchassign.assignee, status: status}
obj.push(updated)
  newSchedule[week] = obj
  let newdoc:any = {}

  console.log(newSchedule, obj)
  await updateDoc(generatedAssignments, {
    [`generatedSchedule.${week}`]: obj
});


}

