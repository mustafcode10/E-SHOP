import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { connect } from "react-redux";
import { FontAwesome } from "react-native-vector-icons";
import * as actions from "./../../Redux/Actions/cartActions";

const { height, width } = Dimensions.get("window");

const Cart = (props) => {
  return (
    <> 
 
      {props.cartItems.length ? (
           <ScrollView>
        <View>
         
          <Text style={styles.titleStyle}>Cart </Text>
          {props.cartItems.map((data) => (
            <>
              <View
                style={styles.listItem}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: data.product.image
                      ? data.product.image
                      : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                  }}
                  resizeMode="center"
                />
                <Text style={styles.productName}>{data.product.name}</Text>
                <Text style={styles.price}>${data.product.price}</Text>
              </View>
            </>
          ))}
        </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.textStyle}>Looks like your cart is empty.</Text>
          <Text style={styles.textStyle}>
            Add products to your cart to get started.
          </Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps, null)(Cart);

const styles = StyleSheet.create({
  container: {},
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    borderBottomWidth: 0.2,
    padding: 5
  },
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
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
  productName:{
    fontSize: 14,
    fontWeight: "bold",

  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color:"blue"
  }
  
});
