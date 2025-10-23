import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import theme, { Colors } from '../constants/styles/theme';

interface Event {
    _id: string;
    title: string;
    [key: string]: any;

}

const EventItem = ({event}:{event:Event}) => {
  return (
    <View style={[theme.listItem, styles.container]} >
      <Image
        // source={{ uri: event?.image? event.image : 'https://via.placeholder.com/150' }}
        source={require('../assets/images/event.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text>{event.title}</Text>
    </View>
  )
}

export default EventItem

const styles = StyleSheet.create({
  container: {
    padding: 8,
    // borderWidth: 1,
    // borderColor: '#e86060ff',
    flexDirection: 'column',
    margin: 10,
    width: 200,
    backgroundColor: Colors.neutral200,
    height: 220,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
})