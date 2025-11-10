import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme, { Colors } from '../constants/styles/theme';

// interface Event {
//     _id: string;
//     title: string;
//     [key: string]: any;

// }

const EventItem = ({event}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[theme.listItem, styles.container]} onPress={() => {navigation.navigate('EventDetails', { id: event._id });}}>
      <Image
        // source={{ uri: event?.image? event.image : 'https://via.placeholder.com/150' }}
        source={require('../assets/images/event.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text>{event.title}</Text>
    </TouchableOpacity>
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