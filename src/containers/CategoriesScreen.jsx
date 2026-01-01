import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories, fetchEventsByCategory } from '../store/slices/category/categoryLogic';
import { setSelectedCategory } from '../store/slices/category/categorySlice';

const CategoriesScreen = () => {
  const dispatch = useDispatch();
  const { categories, eventsByCategory, selectedCategory, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCategoryPress = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(fetchEventsByCategory(categoryId));
  };

  if (loading) return <ActivityIndicator size="large" color="#000" />;
  if (error) return <Text style={{ color: 'red' }}>{error}</Text>;

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>Catégories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              marginVertical: 4,
              backgroundColor: selectedCategory === item._id ? '#2196F3' : '#E0E0E0',
              borderRadius: 8,
            }}
            onPress={() => handleCategoryPress(item._id)}
          >
            <Text style={{ color: selectedCategory === item._id ? '#FFF' : '#000' }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {eventsByCategory.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Événements</Text>
          {eventsByCategory.map((ev) => (
            <View key={ev._id} style={{ marginVertical: 6 }}>
              <Text style={{ fontWeight: 'bold' }}>{ev.title}</Text>
              <Text>{ev.description ?? ''}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default CategoriesScreen;
