import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { AutocompleteDropdown, IAutocompleteDropdownRef } from 'react-native-autocomplete-dropdown';
import GuestItem from '../components/GuestItem';
import theme, { Colors } from '../constants/styles/theme';
import events from '../data/events.json';
import allGuests from '../data/guests.json';

// --- Types ---
interface SuggestionItem {
    id: string;
    title: string;
}


export interface EventItem {
  _id: string;
  title: string;
  description: string;
  organizer: string;
  organization: string;
  venue: string;
  category: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  tickets: string;
  staff: string;
  [key: string]: any;
}

export interface Guest {
  _id: string;
  eventId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  checkedIn: boolean;
  avatar: string;
  [key: string]: any;
}

// --- Helper function ---
const getEventGuests = (eventId: string): Guest[] => {
  if (!eventId) return [];
  return allGuests
    .filter(guest => guest.eventId === eventId)
    .map(guest => ({
      ...guest,
      checkedIn: guest.checkedIn ?? false,
      avatar: guest.avatar ?? '',
    }));
};

// --- Component ---
const GuestList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState<SuggestionItem[] | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [guests, setGuests] = useState<Guest[]>(getEventGuests(selectedItem || ''));
  const dropdownController = useRef<IAutocompleteDropdownRef>(null);

  // --- Suggestions ---
  const getSuggestions = useCallback(async (q: string) => {
    const filterToken = q.toLowerCase();
    if (typeof q !== 'string' || q.length < 1) {
      setSuggestionsList(null);
      return;
    }

    setLoading(true);

    const suggestions: SuggestionItem[] = (events as EventItem[])
      .filter(item => item.title.toLowerCase().includes(filterToken))
      .map(item => ({
        id: item._id, // correction: EventItem uses _id
        title: item.title,
      }));

    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  // --- Update guests when selection changes ---
  useEffect(() => {
    setGuests(getEventGuests(selectedItem || ''));
  }, [selectedItem]);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
    setSelectedItem(null);
  }, []);

  const onOpenSuggestionsList = useCallback((_isOpened: boolean) => {}, []);

  return (
    <View style={theme.container}>
      <View>
        <AutocompleteDropdown
          ref={dropdownController}
          controller={controller => {
            dropdownController.current = controller;
          }}
          direction={Platform.select({ ios: 'down' })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={item => {
            item && setSelectedItem(item.id);
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // prevent double render
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
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: 'center',
          }}
          inputContainerStyle={{
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: Colors.neutral400,
            borderRadius: 5,
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, _text) => (
            <Text style={{ color: Colors.neutral700, padding: 15 }}>{item.title}</Text>
          )}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
        />
      </View>

      <View style={{ flex: 1, marginTop: 25 }}>
        <FlatList
          data={guests}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View>
              <GuestItem guest={item} />
              <Text style={{ color: '#fff', padding: 15 }}>{item.name}</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#db1a1aff', padding: 15 }}>
                Aucun invité pour cet événement
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default GuestList;
