import {
  Text,
  View,
  Image,
  Button,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { connect } from "react-redux";
import { FontAwesome } from "react-native-vector-icons";
import * as actions from "./../../Redux/Actions/cartActions";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";

const { height, width } = Dimensions.get("window");

const data = [
  {
    id: 1,
    name: "Product 1",
  },
  {
    id: 2,
    name: "Product 2",
  },
];

const Cart = (props) => {
 
  let total = 0;
  props.cartItems.forEach((cart) => (total += cart.product.price));
  return (
    <>
      {props.cartItems.length ? (
        <>
          <ScrollView style={styles.container}>
            <View>
              <Text style={styles.titleStyle}>Cart </Text>
              {/* {props.cartItems.map((data) => (
                <>
                  <CartItem item={data} />
                </>
              ))} */}
              <SwipeListView
                data={props.cartItems}
                renderItem={(data) => (
                  <CartItem item={data.item} />
                )}
                renderHiddenItem={(data) => (
                  <View style={styles.hiddenContainer}>
                    <TouchableOpacity 
                    style={styles.hiddenButton}
                    onPress={() => props.removeFromCart(data.item)}
                    >
                      <FontAwesome name="trash" color={"red"} size={30} />
                    </TouchableOpacity>
                  </View>
                )}
                disableRightSwipe={true}
                previewOpenDelay={3000}
                friction={1000}
                tension={40}
                leftOpenValue={75}
                stopLeftSwipe={75}
                rightOpenValue={-75}
              />
            </View>
          </ScrollView>

          <View style={styles.bottomContainer}>
            <Text style={styles.total}> $ {total}</Text>
            <Button title="Clear" onPress={() => props.clearCart()} />
            <Button
              title="Checkout"
              onPress={() => props.navigation.navigate("Checkout")}
            />
          </View>
        </>
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

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: height,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    borderBottomWidth: 0.2,
    padding: 5,
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
  productName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "blue",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
    margin: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  hiddenButton: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 5,
    
  }
});


