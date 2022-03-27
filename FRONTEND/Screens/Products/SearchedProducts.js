import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SearchedProducts = (props) => {
    const {productsFiltered} = props;
  return (
    <View>
      <Text>SearchedProducts</Text>
      {productsFiltered.length > 0 ? (
          productsFiltered.map((item, index) => (
              <View key={index}>
                    <Text>{item.name}</Text>
              </View>
          )

          )
      ): (
          <View>
              <Text>No products found</Text>
          </View>
      )}
    </View>
  )
}

export default SearchedProducts

const styles = StyleSheet.create({})