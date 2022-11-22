import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Config from 'react-native-config'
import ProductCard from '../../component/ProductCard/ProductCard'
import useFetch from '../../hooks/useFetch'
import useCat from '../../hooks/useCat'
import Loading from '../../component/Loading'
import Error from '../../component/Error'

const HomePage = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [setData, setSetData] = useState(data)

  const { loading, error, data } = useFetch(`${Config.API_URL}products`)
  const { loadingCat, errorCat, dataCat } = useCat(`${Config.API_URL}categories`)

  useEffect(() => {
    setSetData(data)
  })

  const renderCategoryItem = ({ item }) => {
    const backgroundColor = item._id === selectedId ? "#B2B2B2" : "#EAEAEA";
    const color = item._id === selectedId ? 'white' : 'black';
    const colorFeather = item._id === selectedId ? '#3C4048' : 'white';

    function categorySelect() {
      setSelectedId(item._id)
      const newData = data.filter(
        function (item) {
          const itemData = setData.category
          const categoryData = item.name
          return itemData.indexOf(ca);
        })
      setSetData(newData)
      console.log(item.name)
    }


    return (
      <TouchableOpacity
        key={item._id}
        onPress={categorySelect}
      >
        <View style={[styles.categoryItemContainer, {
          backgroundColor: backgroundColor
        }]}>
          <Text style={styles.categoryItemText}>{item.name}</Text>
          <View style={[styles.categoryItemFeather, {
            backgroundColor: colorFeather
          }]}>
            <Feather
              name="chevron-down"
              size={10}
              style={styles.categoryItemFeatherSelect}
              color={color}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const handleProductSelect = (_id) => {
    navigation.navigate('Detail', { _id })
  }

  const renderProductItem = ({ item }) => <ProductCard product={item} onSelect={() => handleProductSelect(item._id)} />

  const addProduct = (_id) => {
    navigation.navigate('AddProduct', { _id })
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }



  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <>
            {/* header area */}
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>UPayments</Text>
              <Feather name='search' size={24} />
            </View>
            {/* category area */}
            <View style={styles.categoryContainer}>
              <Text style={styles.categoriesTitle}>Categories</Text>
              <View style={styles.categoriesList}>
                <FlatList
                  data={dataCat}
                  renderItem={renderCategoryItem}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                />
              </View>
            </View>
            {/* product area */}
            <View style={styles.productContainer}>
              <Text style={styles.productTitle}>Products { }</Text>
              <View style={styles.productList}>
                <FlatList
                  data={setData}
                  renderItem={renderProductItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                />
              </View>
            </View>

          </>
        </ScrollView>
        <TouchableOpacity
          onPress={addProduct}
        >
          <View style={styles.addProduct}>
            <Feather
              name="plus-circle"
              size={65}
              style={styles.addProductIcon}
            />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}



export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: "italic",
  },
  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 20,

  },
  categoriesTitle: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  categoriesList: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  categoryItemContainer: {
    backgroundColor: '#F5CA48',
    marginRight: 20,
    borderRadius: 20,
    width: 100,
    borderWidth: 1

  },
  categoryItemImage: {
    width: 60,
    height: 60,
    marginTop: 25,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  categoryItemText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
  },
  categoryItemFeather: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 26,
  },
  categoryItemFeatherSelect: {
    alignSelf: 'center',
  },
  productContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    //marginHorizontal: 20
  },
  productTitle: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  productList: {
    //width: Dimensions.get('screen').width/2,
  },
  addProduct: {
    backgroundColor: 'white'
  },
  addProductIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
  },
})