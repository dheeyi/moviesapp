import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

import Home from './src/screens/Home/Home.tsx';
import Search from './src/screens/Search.tsx';
import WishList from './src/screens/WishList.tsx';
import Profile from './src/screens/Profile.tsx';
import SeeMore from './src/components/core/SeeMore.tsx';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const iconMap : any = {
    Home: 'house-user',
    Search: 'search',
    WishList: 'stream',
    Profile: 'user-alt',
};

const TabNavigator = () => {
    return (
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
                tabBarStyle: {
                    position: 'absolute',
                    paddingTop: 8,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    borderTopWidth: 0,
                    backgroundColor: '#000000',
                },
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
    );
};

function App(): React.JSX.Element {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name="Home"
                  component={TabNavigator}
                  options={{ headerShown: false }}
              />
              <Stack.Screen
                  name="SeeMore"
                  component={SeeMore}
                  options={{ headerShown: true }}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
