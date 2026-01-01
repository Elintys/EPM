import { NavigationContainer } from '@react-navigation/native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/routes/AppNavigator';
import { persistor, store } from './src/store/store';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  // const headerHeight = useHeaderHeight();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AutocompleteDropdownContextProvider>
            {/* <AuthProvider> */}
            <AppNavigator />
            {/* </AuthProvider> */}
          </AutocompleteDropdownContextProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
