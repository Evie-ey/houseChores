
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, StackActions } from '@react-navigation/native'
import { useFonts } from 'expo-font';

import { HomeHeader } from './../components';
import { COLORS } from './../constants';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeStackScreen from './../screens/navigationStack/HomeStack';
import ScheduleStackScreen from './../screens/navigationStack/ScheduleStack';
import SettingsStackScreen from './../screens/navigationStack/SetingStack';
import Login from './../screens/Login';
import Home from './../screens/Home';



const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgound: 'transparent'
  }
}
const HomeNavigation = () => {

  const [loaded] = useFonts({
    InterBold: require('./../assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('./../assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./../assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./../assets/fonts/Inter-Regular.ttf'),
    InterLight: require('./../assets/fonts/Inter-Light.ttf')
  })

  if (!loaded) return null;
  return (
    <PaperProvider>
        <Tab.Navigator screenOptions={
          ({ route }) => ({
      
            // tabBarActiveTintColor: 'black',
            // tabBarInactiveTintColor: 'gray',

          })
        }

          // initialRouteName='Home'


        >

          <Tab.Screen
            name='Home'
            component={HomeStackScreen}
            options={{
              headerTitle: () => < HomeHeader onSearch={() => "hello"} />,
              headerStyle: {
                backgroundColor: COLORS.primary,
                height: 200,
              },
              headerTitleContainerStyle: {
                width: "100%"
              },
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              headerShown: true,

            }}

          />
          <Tab.Screen name='Schedule' component={ScheduleStackScreen}
            options={{
              tabBarLabel: 'Schedule',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name='Settings' component={SettingsStackScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
              ),
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "transparent",
                borderBottomColor: "none",
                borderBottomWidth: 0,


              },
            }}
          />
        </Tab.Navigator>
    </PaperProvider>
  );
}

export default HomeNavigation;


