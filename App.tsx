import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

import Home from './src/screens/Home/Home.tsx';
import Search from './src/screens/Search.tsx';
import WishList from './src/screens/WishList.tsx';
import Profile from './src/screens/Profile.tsx';

const Tab = createBottomTabNavigator();

const iconMap : any = {
    Home: 'house-user',
    Search: 'search',
    WishList: 'stream',
    Profile: 'user-alt',
};

function App(): React.JSX.Element {
  return (
      <NavigationContainer>
          <Tab.Navigator
              screenOptions={({ route } : any) => ({
                  tabBarIcon: ({ color, size }) => {
                      const iconName = iconMap[route.name];
                      return <FontAwesome5
                          name={iconName}
                          size={size}
                          color={color}
                          iconStyle="solid"
                      />;
                  },
                  tabBarActiveTintColor: '#F2C94C',
                  tabBarInactiveTintColor: '#FFFFFF',
                  tabBarActiveBackgroundColor: '#000000',
                  tabBarInactiveBackgroundColor: '#000000',
              })}
          >
              <Tab.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
              />
              <Tab.Screen name="Search" component={Search} />
              <Tab.Screen name="WishList" component={WishList} />
              <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App;
