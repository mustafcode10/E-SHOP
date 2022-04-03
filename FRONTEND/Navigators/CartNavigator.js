
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import Cart from "./../Screens/Cart/Cart";
// import Checkout from './../Screens/Cart/Checkout.js/Checkout';
import Checkout from './../Screens/Cart/Checkout/Checkout'

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
                <Stack.Screen name="Checkout"
            component={Checkout}
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

