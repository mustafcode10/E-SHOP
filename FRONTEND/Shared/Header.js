import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
       style={{height: 70}}
       resizeMode="contain"
         source={require("./../assets/Logo.png")}
       />
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: 30 ,
        height: 50,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
        // marginTop: 40, 
        alignSelf: 'center',
        margin: 30
    }
})