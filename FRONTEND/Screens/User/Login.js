import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// Shared Components
import FormContainer from "./../../Shared/Form/FormContainer";
import Input from "./../../Shared/Form/Input";

const Login = (props) => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Methods
  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in all credentials");
    } else {
      console.log("success login");
    }
  };
  return (
    <FormContainer title="Login">
      <Input
        placeholder="Email"
        name="email"
        id="email"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder="Password"
        name="password"
        id="password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        <Button title="Login" onPress={() => handleSubmit()} />
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <Button
          title="Register"
          onPress={() => props.navigation.navigate("Register")}
        />
      </View>
    </FormContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});
