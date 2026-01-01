import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../constants/styles/theme'

const CategoryItem = ({ title }) => {
  return (
    <View style={[theme.listItem,styles.container]}>
      <Text style={theme.listItemText} numberOfLines={1} >{title}</Text>
    </View>
  )
}

export default CategoryItem         


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        elevation: 2,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 4, 
    },
    text: {
        // color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
