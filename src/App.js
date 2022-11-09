import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TokenListScreen, TokenDetailsScreen } from './screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="TokenList"
          options={{ title: 'Crypto' }}
          component={TokenListScreen}
        />
        <Stack.Screen name="TokenDetails" component={TokenDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
