
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, StackActions } from '@react-navigation/native'
import { useFonts } from 'expo-font';

import { HomeHeader } from './src/components';
import { COLORS } from './src/constants';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeStackScreen from './src/screens/navigationStack/HomeStack';
import ScheduleStackScreen from './src/screens/navigationStack/ScheduleStack';
import SettingsStackScreen from './src/screens/navigationStack/SetingStack';



const Tab = createBottomTabNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgound: 'transparent'
  }
}
const Index = () => {

  const [loaded] = useFonts({
    InterBold: require('./src/assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('./src/assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./src/assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./src/assets/fonts/Inter-Regular.ttf'),
    InterLight: require('./src/assets/fonts/Inter-Light.ttf')
  })

  if (!loaded) return null;
  return (
    <PaperProvider>
      <NavigationContainer theme={theme}>
        <Tab.Navigator screenOptions={
          ({ route }) => ({
            headerShown: true,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
          })
        }
          initialRouteName='Home'

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
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Index;


