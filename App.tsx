/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useHeaderHeight } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/routes/AppNavigator';
import HomeScreen from './src/containers/homeScreen';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  // const headerHeight = useHeaderHeight();
  return (
    <NavigationContainer>
      <AutocompleteDropdownContextProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
      {/* <SafeAreaProvider> */}
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        {/* <MainNavigator /> */}
        {/* </SafeAreaProvider> */}
      </AutocompleteDropdownContextProvider>
    </NavigationContainer> 
  );
}




export default App;
