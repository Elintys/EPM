// import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from '../components/CategoryItem';
import EventItem from '../components/EventItem';
import Header from '../components/Header';
import SearchComponent from '../components/SearchComponent';
import theme, { Colors } from '../constants/styles/theme';
import categories from '../data/categories.json';
import {fetchEventsByUser} from '../store/slices/event/eventLogic';
import { AppDispatch, RootState } from '../store/store';

const EventsScreen = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { events, loading, error } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEventsByUser(user?._id));
    }
  }, [user, dispatch]);

  if (loading) return <ActivityIndicator size="large" color="#000" />;
  if (error) return <Text style={{ color: 'red' }}>{error}</Text>;


  return (
    <LinearGradient
      colors={['#bbaaf2b8', '#ffffffb8', Colors.neutral100]} // Ton dégradé vertical
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientBackground}
    >
      <View style={[{ backgroundColor: 'transparent' }]}>
        <Header />
        <View style={theme.spacerLg} />
        <View style={{ paddingHorizontal: 16, gap: 8, marginTop: 16 }}>
          <Text style={styles.text}>Hello {user?.firstName}</Text>
          <Text>There are 23 upcoming events</Text>
        </View>
        <View style={theme.spacerLg} />
        <SearchComponent />
      </View>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 16, flexGrow: 0}}
          contentContainerStyle={{ paddingRight: 16 }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <CategoryItem title={item.name} />
            </View>
          )}
        />
        <FlatList
          data={events}
          
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 16, flexGrow: 0 }}
          contentContainerStyle={{ paddingRight: 16 }}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View>
              <EventItem event={item} />
            </View>
          )}
          horizontal
        />
        <View style={{ height: 16 }}></View>
    </LinearGradient>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.primaryDark,
    fontSize: 20,
    fontWeight: 'bold',
  },

});





