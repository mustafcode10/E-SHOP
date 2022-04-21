import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// Shared Components
import FormContainer from "./../../Shared/Form/FormContainer";
import Input from "./../../Shared/Form/Input";
import Error from "./../../Shared/Error";
// axios needs to be imported
import axios from "axios";
import baseURL from "./../../assets/common/baseUrl";

const Register = (props) => {
  // States
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Methods
  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in all fields");
    }
    let user = {
      email,
      name,
      phone,
      password,
      isAdmin: false,
    };
    axios
    .post(`${baseURL}users/register`, user)
    .then((res) => {
      if (res.status == 200) {
        setTimeout(() => {
          props.navigation.navigate("Login");
        }, 500);
      }
    })
    .catch((err) => {
        console.log('Error api Register',err);
    })
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title="Register">
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View style={styles.buttonGroup}>
          <Button title="Register" onPress={() => register()} />
        </View>
        <View>
          <Button
            title="Back to Login"
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});
