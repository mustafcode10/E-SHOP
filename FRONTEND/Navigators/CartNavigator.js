import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import Cart from "./../Screens/Cart/Cart";
const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Cart"
            component={Cart}
            options={{
            headerShown: false
            }}
        />
        </Stack.Navigator>
    )
}
const CartNavigator = () => {
  return (
   <MyStack/>
  )
}



export default CartNavigator

const styles = StyleSheet.create({})