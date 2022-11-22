import { StyleSheet, SafeAreaView, View, Text, Platform, StatusBar, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import usePro from '../../hooks/usePro'
import Config from 'react-native-config'
import Loading from '../../component/Loading'
import Error from '../../component/Error'

import productData from "../../data/product.json"

const DetailPage = ({ route, navigation }) => {
  const { _id } = route.params
  // console.log(_id)

  const { loading, error, data } = usePro(`${Config.API_URL}products/${_id}`)
  // console.log(data)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'white'
      // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }}>
      <ScrollView>
        {/* header area */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name='arrow-left' size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>UPayments</Text>
          <Feather name='search' size={24} />
        </View>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: data.avatar }} />
          <View style={styles.body_container}>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.description}>{data.description}</Text>
            <Text style={styles.price}>{data.price} $</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailPage

const styles = StyleSheet.create({
  container: { flex: 1, },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: "italic",
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
    resizeMode: 'contain',
    backgroundColor: 'white'
  },
  body_container: {
    padding: 10,
  },
  title: { fontWeight: 'bold', fontSize: 22 },
  description: { fontStyle: 'italic', marginVertical: 5 },
  price: { fontWeight: 'bold', fontSize: 22, textAlign: 'right' }
})