import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "react-native-vector-icons";



const CartItem = (props) => {
  const data = props.item.product;
  return (
    <View style={styles.listItem} key={Math.random()}>
      <Image
        style={styles.image}
        source={{
          uri: data.image
            ? data.image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
        resizeMode="center"
      />
      <Text style={styles.productName}>{data.name}</Text>
      <Text style={styles.price}>${data.price}</Text>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    borderBottomWidth: 0.2,
    padding: 5,
    backgroundColor: "gainsboro",
  },

  textStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "center",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "blue",
  },
 

});
