import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home/Home.tsx';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: true }}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
