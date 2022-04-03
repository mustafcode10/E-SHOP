import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Icon, withBadge, Badge } from "react-native-elements";

import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <Badge
          value={props.cartItems.length}
          status="error"
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(CartIcon);

const styles = StyleSheet.create({

});
