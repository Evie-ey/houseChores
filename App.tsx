
import { AppRegistry } from 'react-native';
import Index from './indexApp';
import { Provider } from 'react-redux';
import { store } from './src/data/store';
// import { name as appName } from './app.json';
const App = () => {

  return (
    <Provider store={store}>
      <Index />
    </Provider>

  );
}
AppRegistry.registerComponent("houseChores", () => App);

export default App;


