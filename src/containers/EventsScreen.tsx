import React, { useEffect, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from '../components/CategoryItem';
import EventItem from '../components/EventItem';
import Header from '../components/Header';
import SearchComponent from '../components/SearchComponent';
import theme, { Colors } from '../constants/styles/theme';
import { fetchEventsByUser } from '../store/slices/event/eventLogic';
import { fetchAllCategories } from '../store/slices/category/categoryLogic';
import { AppDispatch, RootState } from '../store/store';

const EventsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { events, loading: loadingEvents, error: errorEvents } = useSelector(
    (state: RootState) => state.events
  );
  const { categories, loading: loadingCategories, error: errorCategories } = useSelector(
    (state: RootState) => state.categories
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');
  const Category = CategoryItem as any;

  // Charger les catégories et les événements au démarrage
  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchEventsByUser());
  }, [dispatch]);

  // Filtrage local des événements
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all' || !selectedCategory) return events;
    return events.filter((e) => e.category === selectedCategory);
  }, [events, selectedCategory]);

  if (loadingEvents || loadingCategories)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryDark} />
      </View>
    );

  if (errorEvents || errorCategories)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{errorEvents || errorCategories}</Text>
      </View>
    );

  return (
    <LinearGradient
      colors={['#bbaaf2b8', '#ffffffb8', Colors.neutral100]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientBackground}
    >
      <View>
        <Header />
        <View style={theme.spacerLg} />
        <View style={{ paddingHorizontal: 16, gap: 8, marginTop: 16 }}>
          <Text style={styles.text}>Hello {user?.firstName}</Text>
          <Text>
            {filteredEvents.length > 0
              ? `There are ${filteredEvents.length} upcoming events`
              : 'No upcoming events'}
          </Text>
        </View>
        <View style={theme.spacerLg} />
        <SearchComponent />
      </View>

      {/* 🔹 Liste des catégories */}
      <FlatList
        data={[{ _id: 'all', name: 'All' }, ...categories]} // inclut "All"
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16, flexGrow: 0 }}
        contentContainerStyle={{ paddingRight: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item._id)}>
            <Category
              title={item.name}
              active={selectedCategory === item._id}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />

      {/* 🔹 Liste des événements */}
      <FlatList
        data={filteredEvents}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16, flexGrow: 0 }}
        contentContainerStyle={{ paddingRight: 16 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <EventItem event={item} />
          </View>
        )}
      />
      <View style={{ height: 16 }} />
    </LinearGradient>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  text: {
    color: Colors.primaryDark,
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
