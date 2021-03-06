import React, { useState, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";

import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "./../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

import baseURL from "./../../assets/common/baseUrl";
console.log("baseURL", baseURL);
import axios from "axios";
// const baseUrl = 'https://reqres.in';
///////////////////////////////////////////
const data = require("./../../assets/data/products.json");
const productsCategories = require("./../../assets/data/categories.json");

var { width, height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [intialState, setIntialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setIntialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("call error API", error);
        });

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("call API error", error);
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setIntialState();
      };
    }, [])
  );

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
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };
  return (
    <>
      {loading === false ? (
        <ScrollView style={styles.container}>
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
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
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
                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item) => (
                      <ProductList
                        navigation={props.navigation}
                        item={item}
                        key={item._id.$oid}
                      />
                    ))}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No Products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </ScrollView>
      ) : (
        //Loading
        <View
          style={{
            flex: 1,
            backgroundColor: "#f2f2f2",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  listContainer: {
    // height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
