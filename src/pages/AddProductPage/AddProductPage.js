import { StyleSheet, SafeAreaView, View, Text, FlatList, TextInput, Image, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import usePro from '../../hooks/usePro'
import Config from 'react-native-config'
import Loading from '../../component/Loading'
import Error from '../../component/Error'
import useCat from '../../hooks/useCat'
import { Formik } from 'formik';


const DetailPage = ({ route, navigation }) => {
  const _id = route.params
  const [selected, setSelected] = useState(null)

  const [name, setName] = useState(null)
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [category, setCategory] = useState(null)

  const { loadingCat, errorCat, dataCat } = useCat(`${Config.API_URL}categories`)

  if (route.params) {
    const { loading, error, data } = usePro(`${Config.API_URL}products/${_id}`)
    console.log(data)
    useEffect(() => {
      setName(data?.name)
      setPrice(data?.price)
      setDescription(data?.description)
      setAvatar(data?.avatar)
      setCategory(data?.category)
    })
    
    if (loading) {
      return <Loading />
    }
    if (error) {
      return <Error />
    }
  }
  const renderCategoryItem = ({ item }) => {
    const backgroundColor = item.id === selected ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selected ? 'white' : 'black';

    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => setSelected(item.id)}
      >
        <View style={[styles.categoryItemContainer, {
          backgroundColor: selected ? "#F5CA48" : "",
        }]}>
          <Text style={styles.categoryItemText}>{item.name}</Text>
          <View style={[styles.categoryItemFeather, {
            backgroundColor: selected ? "red" : ""
          }]}>
            <Feather
              name="chevron-up"
              size={10}
              style={styles.categoryItemFeatherSelect}
              color={selected ? "white" : "black"}
              extraData={selected}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView style={{
      flex: 1,
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
          <Formik
            initialValues={{ name: name, price: price, description: description, avatar: avatar }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.textContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  placeholder="Product Title"
                />
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('price')}
                  value={values.price}
                  placeholder="Product Price"
                />
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('description')}
                  value={values.description}
                  placeholder="Product Description"
                />
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('avatar')}
                  value={values.avatar}
                  placeholder="Product Image Link"
                />
                {/* category area */}
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoriesTitle}>Select Categories</Text>
                  <View style={styles.categoriesList}>
                    <FlatList
                      data={dataCat}
                      renderItem={renderCategoryItem}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal={true}
                    />
                  </View>
                </View>
                <Button onPress={handleSubmit} title="Submit" />
              </View>
            )}
          </Formik>
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
  textContainer: {
    marginHorizontal: 20,
  },
  textInput: {
    paddingHorizontal: 10,
    borderWidth: 1,
    height: 40,
    margin: 12,

  }
})