import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Picker, Button } from "react-native";
import { FontAwesome } from "react-native-vector-icons";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>Choose your payment method</Text>
      </View>

      <View>
        {methods.map((item, index) => (
          <TouchableOpacity
            key={item.name}
            style={styles.itemList}
            onPress={() => setSelected(item.value)}
          >
            <Text style={styles.titleList}>{item.name}</Text>
            {selected === item.value ? (
              <FontAwesome name="check" color="green" size={18} />
            ) : null}
          </TouchableOpacity>
        ))}
        {selected == 3 ? (
          <Picker
            // mode="dropdown"
            selectedValue={card}
            style={{ height: 60, width: 200 }}
            onValueChange={(e) => setCard(e)}
          >
            {paymentCards.map((c) => {
              return <Picker.Item key={c.name} label={c.name} value={c.name} />;
            })}
          </Picker>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            title={"Confirm"}
            onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: "gainsboro",
    margin: 5,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 20,
  },
  itemList: {
    margin: 5,
    borderBottomWidth: 0.1,
    padding: 10,
    backgroundColor: "white",
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleList: {
    fontSize: 18,
  },
});
