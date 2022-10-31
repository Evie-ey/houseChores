
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider, Provider } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, StackActions } from '@react-navigation/native'
import {useFonts} from 'expo-font';
import Details from './screens/Details';
import Home from './screens/Home';
import { HomeHeader } from './components';
import { COLORS } from './constants';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgound: 'transparent'
  }
}
const App = () =>{

  const [loaded] = useFonts({
    InterBold: require('./assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
    InterLight: require('./assets/fonts/Inter-Light.ttf')
  })

  if(!loaded) return null;
  return (
    <Provider>
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{headerShown: true}}
      initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{headerTitle: () => < HomeHeader onSearch={()=> "hello"}/>,
          headerStyle: {
            backgroundColor: COLORS.primary,
            height: "200px",
            width: "100%"
          },
          headerTitleContainerStyle: {
            width: "100%"
          }

          }}

        />
        <Stack.Screen name='Details' component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;


