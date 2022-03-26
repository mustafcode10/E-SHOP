import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductList = ({item}) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({})