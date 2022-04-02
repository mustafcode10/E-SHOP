import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availablity, setAvailablity] = useState();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.imageContainer}
          />
          <Text>{item.name} </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: "#fff",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 250,
  },
});
