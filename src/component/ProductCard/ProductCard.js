import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product, onSelect }) => {
  const { _id } = product
  const navigation = useNavigation();
  const editable = (_id) => {
    navigation.navigate('AddProduct', product["_id"])
  }
  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={styles.productItemContainer}>
        <View>
          <Image source={{ uri: product.avatar }} style={styles.productItemImage} />
          <View style={styles.editable}>
            <TouchableOpacity onPress={editable}>
              <Feather name='edit' size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.productItemText}>{product.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  productItemContainer: {
    flex: 1
  },
  productItemImage: {
    width: Dimensions.get('screen').width * 0.35,
    height: Dimensions.get('screen').height * 0.25,
    marginHorizontal: 20,
    resizeMode: "center"
  },
  productItemText: {
    width: Dimensions.get('screen').width * 0.35,
    resizeMode: 'contain'
  },
  productItemFeather: {},
  editable: {
    position: 'absolute',
    alignSelf: 'flex-start',
    bottom: 0,
    marginHorizontal: 10
  }
})