import { Text, View } from 'react-native'
import React from 'react'
import{connect} from 'react-redux'

const Cart = (props) => {
  return (
    <View>
      {props.cartItems.map(item =>(
        <Text>{item.product.name}</Text>
      ))}
    </View>
  )
}

const mapStateToProps = (state) => {
    const {cartItems} = state
    return {
        cartItems: cartItems  
    }
}



export default connect(mapStateToProps, null)(Cart)

