import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Schedule from "../Schedule";
import Home from "../Home";
import Settings from "../Settings";
const ScheduleStack = createNativeStackNavigator();

function ScheduleStackScreen() {
  return (
    <ScheduleStack.Navigator screenOptions={{headerShown: false}}>
      <ScheduleStack.Screen name="ScheduleStack" component={Schedule} />
      <ScheduleStack.Screen name="Home" component={Home} />
      <ScheduleStack.Screen name="Settings" component={Settings} />
    </ScheduleStack.Navigator>
  );
}

export default ScheduleStackScreen;
