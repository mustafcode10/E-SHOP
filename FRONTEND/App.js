import React from "react"
import { LogBox } from "react-native";
import Header from "./Shared/Header";
import { NavigationContainer } from "@react-navigation/native";

// Navigators
import Main from "./Navigators/Main";

LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Main />
    </NavigationContainer>
  );
}
