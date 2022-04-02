import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ProductContainer from './../Screens/Products/ProductContainer';
import SingleProduct from './../Screens/Products/SingleProduct';

// Stack
const Stack = createStackNavigator();


const MyStack = ()=>(
    <Stack.Navigator>
        <Stack.Screen name="Home"
         component={ProductContainer}
            options={{
                headerShown: false
            }}
          />
          <Stack.Screen name="Product Details"
         component={SingleProduct}
            options={{
                headerShown: false
            }}
          />
    </Stack.Navigator>
)

const HomeNavigator = () => {
  return (
    <MyStack/>
  )
}

export default HomeNavigator

const styles = StyleSheet.create({})