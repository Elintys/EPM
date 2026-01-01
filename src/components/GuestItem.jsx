import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import theme, { Colors } from '../constants/styles/theme';

const GuestItem = ({ guest }) => {
  return (
    <View style={[theme.listItem, styles.container]}>
      <Text>{guest?.fullName}</Text>
      <View
        style={[
          styles.btnChecking,
          { backgroundColor: guest.checkedIn ? Colors.primaryDark : '' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.neutral300,
    height: 50,
  },
  btnChecking: {
    width: 12,
    height: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral400,
    marginRight: 8,
  }
});

export default GuestItem;
