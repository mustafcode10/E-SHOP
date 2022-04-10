import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";

import { connect } from "react-redux";
import * as actions from "./../../../Redux/Actions/cartActions";

var { width, height } = Dimensions.get("window");
const Confirm = (props) => {
  const confirm = props.route.params;
  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    }, 500);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.titleConfirm}>Confirm Order</Text>
        {props.route.params ? (
          <View style={styles.confirmContainer}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {confirm.order.order.shippingAddress1}</Text>
              <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
              <Text>City: {confirm.order.order.city}</Text>
              <Text>Zip Code: {confirm.order.order.zip}</Text>
              <Text>Country: {confirm.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {confirm.order.order.orderItems.map((x) => (
              <View style={styles.listItem}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: x.product.image }}
                />

                <Text>{x.product.name}</Text>
                <Text>$ {x.product.price}</Text>
              </View>
            ))}
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 20 }}>
          <Button title={"Confirm"} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

export default connect(null, mapDispatchToProps)(Confirm);

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleConfirm: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 20,
  },
  confirmContainer: {
    borderWidth: 1,
    borderColor: "orange",
    alignSelf: "center",
    padding: 10,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: width / 1.2,
  },
});
