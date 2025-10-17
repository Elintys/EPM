import { View, Text } from 'react-native'
import React from 'react'
import theme from '../constants/styles/theme';

interface Event {
    _id: string;
    title: string;
    [key: string]: any;

}

const EventItem = ({event}:{event:Event}) => {
  return (
    <View style={theme.listItem} >

      <Text>{event.title}</Text>
    </View>
  )
}

export default EventItem