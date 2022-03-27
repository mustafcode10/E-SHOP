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
  ScrollView,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";

import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
const data = require("./../../assets/data/products.json");
var { width } = Dimensions.get("window");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  }, []);
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };
  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  return (
    <ScrollView>
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
            onChangeText={(text) => searchProduct(text)}
            onFocus={openList}
          />
        </View>
        {focus == true ? (
          <SearchedProducts
            productsFiltered={productsFiltered}
            onBlur={onBlur}
          />
        ) : (
          <View style={{ marginTop: 100 }}>
            <Text>Product Container</Text>
            <FlatList
              numColumns={2}
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductList item={item} key={item.id} />
              )}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({});
