import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Schedule from "../Schedule";
import Home from "../Home";
import Settings from "../Settings";
import Residents from "../residents/Residents";
import { Button } from "react-native-paper";
import NewResident from "../forms/newResident";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import NewArea from "../forms/newArea";
import Areas from "../area/Areas";
import AreaDetails from "../area/AreaDetails";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config";
const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {

  const [addButton, setAddButton] = useState(false)

  const [addAreaButton, setAddAreaButton] = useState(false)

  useEffect(() => {
    const fetchResidents = async () => {
      const residentsRef = await getDocs(collection(db, 'residents'));
      const areasRef = await getDocs(collection(db, 'areas'));
      if(residentsRef.size >= 10) setAddButton(true);

      if(areasRef.size >= 15) setAddAreaButton(true);
    }

    fetchResidents()

  }, [])
  const navigation = useNavigation();
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Group>
        <SettingsStack.Screen name="SettingsStack" component={Settings} />
        <SettingsStack.Screen name="Home" component={Home} />
        <SettingsStack.Screen name="Schedule" component={Schedule} />
      </SettingsStack.Group>
      <SettingsStack.Group screenOptions={{ presentation: 'modal', headerShown: true }}>
        <SettingsStack.Screen name="Residents" component={Residents}
          options={{
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("New Resident" as never)}
                disabled={addButton}
                color="black"
              >Add</Button>
            ),
          }}
        />
        <SettingsStack.Screen name="New Resident" component={NewResident}
          options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}

                color="black"
              >Save</Button>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons name="close" color={"black"} size={20}
                onPress={() => navigation.navigate("Residents" as never)}
              />

            )
          }}
        />
        <SettingsStack.Screen name="Areas" component={Areas}
          options={{
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("New Area" as never)}
                disabled={addAreaButton}
                color="black"
              >Add</Button>
            ),
          }}
        />
        <SettingsStack.Screen name="New Area" component={NewArea}
          options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}

                color="black"
              >Save</Button>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons name="close" color={"black"} size={20}
                onPress={() => navigation.navigate("Areas" as never)}
              />

            )
          }}
        />
        <SettingsStack.Screen name="AreaDetails" component={AreaDetails}
          options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}

                color="black"
              >Save</Button>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons name="close" color={"black"} size={20}
                onPress={() => navigation.navigate("Areas" as never)}
              />

            )
          }}
        />
      </SettingsStack.Group>
    </SettingsStack.Navigator>
  );
}

export default SettingsStackScreen;
