import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { AppDispatch, RootState } from '../store/store';
import { fetchEventById } from '../store/slices/event/eventLogic';
import { Colors } from '../constants/styles/theme';
// import Icon from 'react-native-vector-icons/Feather';

const EventDetailsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute();
  const { id } = route.params as { id: string };

  const { loading, error, selectedEvent } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryDark} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!selectedEvent) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>Aucun détail trouvé pour cet événement.</Text>
      </View>
    );
  }

  const event = selectedEvent;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.category}>Category:{event.category}</Text>

      {/* Informations principales */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          {/* <Icon name="map-pin" size={18} color={Colors.primaryDark} /> */}
          <Text style={styles.infoText}>{event?.venue.address}</Text>
        </View>
        <View style={styles.infoRow}>
          {/* <Icon name="calendar" size={18} color={Colors.primaryDark} /> */}
          <Text style={styles.infoText}>
            {new Date(event?.startDate).toLocaleString('fr-FR')} → {new Date(event?.endDate).toLocaleString('fr-FR')}
          </Text>
        </View>
        <View style={styles.infoRow}>
          {/* <Icon name="users" size={18} color={Colors.primaryDark} /> */}
          <Text style={styles.infoText}>{ 'Capacité non définie'}</Text>
        </View>
        <View style={styles.infoRow}>
          {/* <Icon name="user" size={18} color={Colors.primaryDark} /> */}
          <Text style={styles.infoText}>{event?.organizer?.firstName + '  ' + event?.organizer?.lastName || 'Organisateur inconnu'}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.sectionText}>
          {event.description || 'Aucune description disponible.'}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          {/* <Icon name="users" size={20} color="#fff" /> */}
          <Text style={styles.actionText}>Voir les invités</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, { backgroundColor: Colors.primaryDark }]}>
          {/* <Icon name="camera" size={20} color="#fff" /> */}
          <Text style={styles.actionText}>Scanner les billets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  category: {
    fontSize: 14,
    color: Colors.neutral600,
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 8,
    color: Colors.neutral700,
    fontSize: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginBottom: 8,
  },
  sectionText: {
    color: Colors.neutral700,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#5B3FFF',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
  },
});
