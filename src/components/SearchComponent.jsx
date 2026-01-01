import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants/styles/theme'

const SearchComponent = () => {
  return (
    <View style = {styles.searchContainer} >
      <Text>SearchComponent</Text>
    </View>
  )
}

export default SearchComponent


const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        height: 50,
        marginHorizontal: 16,
        padding: 12,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginRight: 8,
    },
    searchButton: {
        backgroundColor: Colors.neutral400,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 8,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})