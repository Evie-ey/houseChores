import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Schedule from "../Schedule";
import Home from "../Home";
import Settings from "../Settings";
import Residents from "../residents/Residents";
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeStack" component={Home} />
      <HomeStack.Screen name="Settings" component={Settings} />
      <HomeStack.Screen name="Schedule" component={Schedule} />
      {/* <HomeStack.Screen name="Residents" component={Residents} /> */}
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
