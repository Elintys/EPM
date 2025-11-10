import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../constants/styles/theme';
import { createEvent } from '../store/slices/event/eventLogic';
import { clearEvents } from '../store/slices/event/eventSlice';
import { AppDispatch, RootState } from '../store/store';

const CreateEventScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.events);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !category.trim() || !location.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    dispatch(
      createEvent({
        title,
        description,
        category,
        location,
        capacity: capacity ? parseInt(capacity) : undefined,
        // startDate,
        // endDate,
      })
    ).then(() => {
      setTitle('');
      setDescription('');
      setCategory('');
      setLocation('');
      setCapacity('');
      dispatch(clearEvents());
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Créer un événement</Text>

      {/* Champ : Titre */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Titre de l'événement *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Gala des Entrepreneurs"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Champ : Description */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Détaillez l'objet de l'événement..."
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Champ : Catégorie */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Catégorie *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Conférence, Atelier, Soirée..."
          value={category}
          onChangeText={setCategory}
        />
      </View>

      {/* Champ : Lieu */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Lieu *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Montréal, Centre Bell"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Champ : Capacité */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Capacité (optionnel)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 150"
          keyboardType="numeric"
          value={capacity}
          onChangeText={setCapacity}
        />
      </View>

      {/* Champ : Dates */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Date et heure de début *</Text>
        <TouchableOpacity onPress={() => setShowStart(true)} style={styles.datePickerButton}>
          <Text style={styles.dateText}>{startDate.toLocaleString('fr-FR')}</Text>
        </TouchableOpacity>
        {showStart && (
          <DateTimePicker
            value={startDate}
            mode="datetime"
            onChange={(_, date) => {
              setShowStart(false);
              if (date) setStartDate(date);
            }}
          />
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Date et heure de fin *</Text>
        <TouchableOpacity onPress={() => setShowEnd(true)} style={styles.datePickerButton}>
          <Text style={styles.dateText}>{endDate.toLocaleString('fr-FR')}</Text>
        </TouchableOpacity>
        {showEnd && (
          <DateTimePicker
            value={endDate}
            mode="datetime"
            onChange={(_, date) => {
              setShowEnd(false);
              if (date) setEndDate(date);
            }}
          />
        )}
      </View>

      {/* Bouton de validation */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primaryDark} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Créer l'événement</Text>
        </TouchableOpacity>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </ScrollView>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 25,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral300,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: Colors.neutral300,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    color: Colors.neutral700,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
