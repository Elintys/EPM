import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import GuestItem from '../components/GuestItem';
import theme, { Colors } from '../constants/styles/theme';
import { fetchGuestsByEvent } from '../store/slices/guest/guestLogic';
import { fetchEventsByUser } from '../store/slices/event/eventLogic';
import { clearGuests } from '../store/slices/guest/guestSlice';
import { useNavigation } from '@react-navigation/native';

const GuestList = () => {
  const dispatch = useDispatch();
  const dropdownController = useRef(null);
  
  const navigation = useNavigation();

  const { events, loading: loadingEvents } = useSelector(
    (state) => state.events,
  );
  const {
    guests,
    loading: loadingGuests,
    error,
  } = useSelector((state) => state.guests);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [suggestionsList, setSuggestionsList] = useState([]);

  // Charger les événements au montage
  useEffect(() => {
    dispatch(fetchEventsByUser());
  }, [dispatch]);

  // Mettre à jour la liste des suggestions quand les événements changent
  useEffect(() => {
    if (events?.length > 0) {
      setSuggestionsList(events.map(ev => ({ id: ev._id, title: ev.title })));
    }
  }, [events]);

  useEffect(() => {
    // Charger les invités quand un événement est sélectionné
    if (selectedEvent) {
      dispatch(fetchGuestsByEvent(selectedEvent));
    } else {
      // Si aucun événement n'est sélectionné, vider la liste des invités
      dispatch(clearGuests());
    }
  }, [selectedEvent, dispatch]);

  const onClearPress = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const onOpenSuggestionsList = useCallback((_isOpened) => {}, []);

  return (
    <View style={theme.container}>
      <View>
        <AutocompleteDropdown
          controller={controller => {
            dropdownController.current = controller;
          }}
          direction={Platform.select({ ios: 'down' })}
          dataSet={suggestionsList}
          onSelectItem={item => {
            if (item) setSelectedEvent(item.id);
          }}
          debounce={400}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loadingEvents}
          useFilter={true}
          textInputProps={{
            placeholder: 'Sélectionner un événement',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              color: Colors.neutral700,
              fontWeight: '500',
              paddingLeft: 18,
            },
          }}
          inputContainerStyle={{ borderRadius: 25 }}
          suggestionsListContainerStyle={{
            backgroundColor: Colors.neutral400,
            borderRadius: 5,
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={item => (
            <Text style={{ color: Colors.neutral700, padding: 15 }}>
              {item.title}
            </Text>
          )}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
        />
      </View>
      <View style={theme.spacerLg} />
      {/* <View style ={}> */}
        <TouchableOpacity style={[style.scanBtnContainer,{backgroundColor:Colors.primary}]} onPress={() => {navigation.navigate('QRScanner')}}>
          <Text
            style={{
              color: Colors.neutral300,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Launch QR code scanner
          </Text>
        </TouchableOpacity>
      {/* </View> */}

      <View style={theme.spacerLg} />

      <View style={[ { flex: 1 }]}>
        {loadingGuests ? (
          <ActivityIndicator size="large" color={Colors.primaryDark} />
        ) : error ? (
          <Text style={{ color: 'red' }}>{error}</Text>
        ) : (
          <FlatList
            data={guests}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <View>
                <GuestItem guest={item} />
              </View>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: Colors.neutral700, padding: 15 }}>
                  Aucun invité pour cet événement
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default GuestList;

const style = StyleSheet.create({
  scanBtnContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    borderRadius: 25,
    height: 50,
    width: '60%',
    alignSelf: 'center',
  }
})
