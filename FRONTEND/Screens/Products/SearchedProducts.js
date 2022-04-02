import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const SearchedProducts = (props) => {
  const { productsFiltered } = props;
  return (
    <View>
      {/* <Text>SearchedProducts</Text> */}
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <TouchableOpacity
          onPress={()=> props.navigation.navigate("Product Details", {item: item})}
          >
             <View key={item._id.$oid}>
            <View style={styles.listItem}>
              <Image
              
                style={styles.image}
                resizeMode="contain"
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
              />
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            </View>
          </View>

          </TouchableOpacity>
         
        ))
      ) : (
        <View>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>
            No products match the search criteria.
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchedProducts;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    padding: 5,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#add8e6",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
