import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from "react-native-vector-icons";

//Stacks
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';

const Tab = createBottomTabNavigator();



const Main = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
        keybordHidesOnTap: true,
        showLabel: false,
        activeTintColor: '#e91e63',
        // inactiveTintColor: '#000',
        

    }}
    >
         <Tab.Screen name="Home" 
         component={HomeNavigator}
         options={{ 
             headerShown: false,
            // tabBarLabel: 'Home',
            tabBarIcon: ({ color,}) => (
                <FontAwesome name="home" color={color} size={35} style={{position: "relative"}} />
            )
         }}

          />
          <Tab.Screen
            name="Cart"
            component={CartNavigator}
            options={{
                // tabBarLabel: 'Cart',
                headerShown: false,
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="shopping-cart" color={color} size={35}  />
                )
            }}
          />
          <Tab.Screen 
            name="Admin"
            component={HomeNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, }) => (
                    <FontAwesome name="cog" color={color} size={35}  />
                )
            }}
          />
          <Tab.Screen 
            name="User"
            component={HomeNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="user" color={color} size={35}  />
                )
            }}
          />
     
     
    </Tab.Navigator>
  )
}

export default Main

const styles = StyleSheet.create({})