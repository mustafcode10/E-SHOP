import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity
} from "react-native";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availablity, setAvailablity] = useState();
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.price}>${item.price}</Text>
       <TouchableOpacity style={{backgroundColor: "#add8e6"}}>
       <Text style={styles.price}>Add</Text>
       </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 22,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    bottom: 0,
    justifyContent: "space-between",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
