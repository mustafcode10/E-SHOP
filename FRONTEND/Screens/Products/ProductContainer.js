import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";

import ProductList from "./ProductList";
const data = require("./../../assets/data/products.json");
var { width } = Dimensions.get("window");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  useEffect(() => {
    setProducts(data);
    setProductsFilter(data);
    return () => {
      setProducts([]);
    }
  },[]);
  return (
    <View>
      {/* <SearchBar
        placeholder="Type Here..."
      /> */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#d3d3d3",
          width: width,
          height: 40,
          // justifyContent: "center",
          alignItems: "center",
          borderRadius: width / 2,
          padding: 5,
        }}
      >
        <Ionicons name="ios-search" size={25} color="black" />
        <TextInput
          placeholder="Search"
          style={{ fontSize: 15, fontWeight: "bold", padding: 5 }}
        />
      </View>
      <Text>Product Container</Text>
      <View style={{ marginTop: 100 }}>
        <FlatList
          numColumns={2}
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductList item={item} key={item.id} />}
        />
      </View>
    </View>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
 
});
