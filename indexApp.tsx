
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
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import HomeNavigation from './src/screens/HomeNavigation';

import {
  en,
  // fr,
  // nl,
  // de,
  // pl,
  // pt,
  // ar,
  // ko
  // fr
  enGB,
  registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en', en)
// registerTranslation('fr', fr)
// registerTranslation('nl', nl)
// registerTranslation('pl', pl)
// registerTranslation('pt', pt)
// registerTranslation('de', de)
// registerTranslation('ar', ar)
// registerTranslation('ko', ko)
// registerTranslation('fr', fr)
registerTranslation('en-GB', enGB)

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={
          ({ route }) => ({
            headerShown: false


          })
        }
      >
           <Stack.Screen name="Login" component={Login} />
           <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
       </Stack.Navigator>

      </NavigationContainer>
    </PaperProvider>
  );
}

export default Index;


