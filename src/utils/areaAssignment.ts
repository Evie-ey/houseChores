// const rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16, 17, 18, 19, 20];
// const individuals = ["A", "B", "C", "D", "E", "F"];

const rooms = ["Hall", "bath", "Kit", "Din", "Toilet", "Living"]
const individuals = ["Ev", "Ang", "Ana", "Ch", "Oo", "Gab"]

let individaulMaps: Map<string, string[]> = new Map();
let nextAssignment = 0;
let roomPosition = 0;
let assignedRooms: any = [];
let completelyAssigned: any = [];

export function assignRooms() {
  const roomAssignments: { [week: string]: Map<string, string[]> } = {};
  let week = 0;
  while (week < 10) {
    const currentWeek = `Week${week}`;
    roomAssignments[currentWeek] = new Map();
    assignedRooms = [];
    if (completelyAssigned.length === individuals.length) {
      individaulMaps = new Map();
      completelyAssigned = [];
    }
    while (assignedRooms.length !== rooms.length && completelyAssigned.length !== individuals.length) {
      for (let i = 0; i < individuals.length; i++) {
        const currentIndex = (i + nextAssignment) % individuals.length;
        if (completelyAssigned.includes(individuals[currentIndex])) {
          continue;
        }
        const currentMapped: any = individaulMaps.has(individuals[currentIndex]) ? individaulMaps.get(individuals[currentIndex]) : [];

        let unmappedRoom;
        // Follow natural order of rooms
        for (let j = 0; j < rooms.length; j++){
          const roomIndex = (j + roomPosition) % rooms.length;
          if (!assignedRooms.includes(rooms[roomIndex]) && !currentMapped.includes(rooms[roomIndex])) {
            unmappedRoom = rooms[roomIndex];
            roomPosition = (roomIndex + 1) % rooms.length;
            break;
          }
        }

        if (unmappedRoom) {
          // Assign room by week
          const assignment: any = roomAssignments[currentWeek].has(individuals[currentIndex]) ? roomAssignments[currentWeek].get(individuals[currentIndex]) : [];
          assignment && assignment.push(unmappedRoom);
          roomAssignments[currentWeek].set(individuals[currentIndex], assignment);
          // Add to rooms assigned to individual
          currentMapped && currentMapped.push(unmappedRoom);
          individaulMaps.set(individuals[currentIndex], currentMapped);
          assignedRooms.push(unmappedRoom);
          if (currentMapped.length === rooms.length) {
            completelyAssigned.push(individuals[currentIndex]);
          }
          if (completelyAssigned.length === individuals.length || assignedRooms.length === rooms.length) {
            nextAssignment = (1 + currentIndex) % individuals.length;
          }
        }
      }
    }
    week += 1;
  }
  console.log(roomAssignments);
}
