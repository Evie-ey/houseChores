import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../config";
import { fetchAreas } from "../screens/area/Areas";
import { fetchResidents } from "../screens/residents/Residents";
import { getAssignedRoom, getCompletelyAssigned, getIndividualmaps, getNextAssignment, getRoomAssignments, getRoomPosition, resetAssignedRooms, resetCompletelyAssigned, resetIndividualMaps, updateAssignedRooms, updateCompletelyAssigned, updateIndividualMaps, updateNextAssignment, updateRoomAssignment, updateRoomPosition } from "./firestoreFuntions";
export async function toGnerateSchedules(currentWeek: any) {
  let rooms = await fetchAreas()
  let individuals = await fetchResidents()
  let individualMaps: any = await getIndividualmaps();
  let nextAssignment: any = await getNextAssignment();
  let roomPosition: any = await getRoomPosition();
  let assignedRooms: any = await getAssignedRoom()
  let completelyAssigned: any = await getCompletelyAssigned();
  let roomAssignments: any = await getRoomAssignments();

  rooms = rooms.map((room:any) => room.area)
  individuals = individuals.map((indi:any) => indi.name)

  // const roomAssignments: { [week: string]: Map<string, string[]> } = {};

  // let week = 0;
  // let week = new Date();
  // while(week < 1) {
    // const currentWeek = `Week${week}`;
    // roomAssignments[currentWeek] = new Map();
    roomAssignments[currentWeek] = {};
    // assignedRooms = [];
    assignedRooms  = await resetAssignedRooms()

    if (completelyAssigned.length === individuals.length) {

      // individualMaps = {};
      individualMaps = await resetIndividualMaps()

      // completelyAssigned = [];
      completelyAssigned = await resetCompletelyAssigned()
    }

    while (assignedRooms.length !== rooms.length && completelyAssigned.length !== individuals.length) {
      for (let i = 0; i < individuals.length; i++) {
        const currentIndex = (i + nextAssignment) % individuals.length;
        if (completelyAssigned.includes(individuals[currentIndex])) {
          continue;
        }
        const currentMapped: any = individuals[currentIndex] in individualMaps ? individualMaps[individuals[currentIndex]] : [];

        let unmappedRoom;
        // Follow natural order of rooms
        for (let j = 0; j < rooms.length; j++){
          const roomIndex = (j + roomPosition) % rooms.length;
          if (!assignedRooms.includes(rooms[roomIndex]) && !currentMapped.includes(rooms[roomIndex])) {
            unmappedRoom = rooms[roomIndex];
            let roomPositionNo = (roomIndex + 1) % rooms.length;
            roomPosition = await updateRoomPosition(roomPositionNo)

            break;
          }
        }

        if (unmappedRoom) {

          // Assign room by week
          // const assignment: any = roomAssignments[currentWeek].has(individuals[currentIndex]) ? roomAssignments
          console.log(roomAssignments, 'hew again ')
          const assignment: any = individuals[currentIndex] in roomAssignments[currentWeek] ?
           roomAssignments[currentWeek][individuals[currentIndex]] : [];
          assignment && assignment.push(unmappedRoom);

          // roomAssignments[currentWeek].set(individuals[currentIndex], assignment);
          roomAssignments = await updateRoomAssignment(currentWeek,individuals[currentIndex], assignment)
          // Add to rooms assigned to individual
          currentMapped && currentMapped.push(unmappedRoom);
          // individaulMaps.set(individuals[currentIndex], currentMapped);

          individualMaps = await updateIndividualMaps(individuals[currentIndex], currentMapped)
          // assignedRooms.push(unmappedRoom);

          assignedRooms = await updateAssignedRooms(unmappedRoom)

          if (currentMapped.length === rooms.length) {
            // completelyAssigned.push(individuals[currentIndex]);
            completelyAssigned = await updateCompletelyAssigned(individuals[currentIndex])

          }

          if (completelyAssigned.length === individuals.length || assignedRooms.length === rooms.length) {
            let nextAssign = (1 + currentIndex) % individuals.length;
            nextAssignment = await updateNextAssignment(nextAssign)
          }
        }
      }


    }
  // week += 1;
  // }
console.log(roomAssignments, 'rooom assignments')

}
