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
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";

import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from './../../Shared/Banner';
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
      <View style={styles.container} >
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
            marginBottom: 15,
          }}
        >
          <Ionicons name="ios-search" size={25} color="black" />
          <TextInput
            placeholder="Search"
            style={{ fontSize: 18, padding: 5 }}
            onChangeText={(text) => searchProduct(text)}
            onFocus={openList}
          />
          {focus == true ? (
            <TouchableOpacity onPress={onBlur}>
              <Ionicons
                name="close"
                size={25}
                style={{ color: "red", marginLeft: 280 }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {focus == true ? (
          <SearchedProducts
            productsFiltered={productsFiltered}
          />
        ) : (
          <ScrollView>
          <View >
            {/* <Text>Product Container</Text> */}
            <Banner />
            <FlatList
              numColumns={2}
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductList item={item} key={item.id} />
              )}
            />
          </View>
          </ScrollView>
        )}
      </View>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  }
});
