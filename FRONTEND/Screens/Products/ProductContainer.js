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
import Banner from "./../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
///////////////////////////////////////////
const data = require("./../../assets/data/products.json");
const productsCategories = require("./../../assets/data/categories.json");

var { width } = Dimensions.get("window");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [intialState, setIntialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(productsCategories);
    setActive(-1);
    setIntialState(data);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setIntialState();
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
  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(intialState), setActive(true)]
        : [setProductsCtg(products.filter((item) => item.category.oid === ctg))];
    }
  };
  return (
    <View style={styles.container}>
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
        <SearchedProducts productsFiltered={productsFiltered} />
      ) : (
        <ScrollView>
          <View>
            {/* <Text>Product Container</Text> */}
            <View>
            <Banner />
            </View>
          
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
            </View>

            {/* <FlatList
              numColumns={2}
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductList item={item} key={item.id} />
              )}
            /> */}
            {productsCtg.length > 0 ? (
              <>
              {productsCtg.map((item) => (
                <ProductList item={item} key={item._id.$oid} />
              ))}
              </>
            ): (
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Text>No Products</Text>
                </View>
            )}
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
  },
});
