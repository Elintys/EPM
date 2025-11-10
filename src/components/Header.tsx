import React from 'react';
import { Text, View } from 'react-native';
// import Feather from '@react-native-vector-icons/feather';
import theme, { Colors } from '../constants/styles/theme';

const Header = () => {
  return (
    <View style={{}}>
      <View style={[theme.header,{backgroundColor: Colors.transparent}]}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          {/* <Feather name="home" size={20} color={Colors.neutral700} /> */}
          <Text style={[theme.headerTitle,{fontWeight: 'bold'}]}>Montreal-Est,QC</Text>
          {/* <Feather name="chevron-down" size={20} color={Colors.neutral700} /> */}
        </View>
        <Text>Notif</Text>
      </View>
    </View>
  );
};

export default Header;


// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//   },
//   title: {
//     fontFamily: theme.headerTitle.fontFamily,
//     fontSize: 20,
//     // fontWeight: 'bold',
//     // color: Colors.neutral700,
//   },
// });