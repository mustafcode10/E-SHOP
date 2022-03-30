import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
        showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: "#f2f2f2", }}
    >
      <View style={{ margin: 10, padding: 0, flexDirection: "row"}}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter("all"), props.setActive(-1);
          }}
        >
          <View
            style={[
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: "white" }}>All</Text>
          </View>
        </TouchableOpacity>
        {props.categories.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              props.categoryFilter(item._id),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <View
              style={[
                styles.center,
                { margin: 5 },
                props.active == props.categories.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text style={{ color: "white" }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});
