import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import Login from "./../Screens/User/Login";
import Register from "./../Screens/User/Register";
import UserProfile from "./../Screens/User/UserProfile";
// Stack
const Stack = createStackNavigator();

const MyStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="UserProfile"
      component={UserProfile}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
const UserNavigator = () => {
  return <MyStack />;
};

export default UserNavigator;
