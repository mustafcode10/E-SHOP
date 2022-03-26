import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";

import ProductList from "./ProductList"
const data = require("./../../assets/data/products.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(data);
  });
  return (
    <View>
      <Text>Product Container</Text>
      <View style={{ marginTop: 100 }}>
        <FlatList
          horizontal
          data={products}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <ProductList item={item} key={item.name}/>}
        />
      </View>
    </View>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({});
