import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Platform, Text, View } from 'react-native';
import { AutocompleteDropdown, IAutocompleteDropdownRef } from 'react-native-autocomplete-dropdown';
import GuestItem from '../components/GuestItem';
import theme, { Colors } from '../constants/styles/theme';
import events from '../data/events.json';
import allGuests from '../data/guests.json';
import { IGuest } from '../interfaces/Guest';
import { IEventItem, ISuggestionItem } from '../interfaces/IEventItem';







// --- Helper function ---
const getEventGuests = (eventId: string): IGuest[] => {
  if (!eventId) return [];
  return (allGuests as any[])
    .filter(guest => guest.eventId === eventId)
    .map(guest => ({
      ...guest,
      _id: guest._id ?? guest.id ?? '',
      id: guest.id ?? guest._id ?? '',
      checkedIn: guest.checkedIn ?? false,
      avatar: guest.avatar ?? '',
    })) as IGuest[];
};

// --- Component ---
const GuestList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState<ISuggestionItem[] | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [guests, setGuests] = useState<IGuest[]>(getEventGuests(selectedItem || ''));
  const dropdownController = useRef<IAutocompleteDropdownRef>(null);

  // --- Suggestions ---
  const getSuggestions = useCallback(async (q: string) => {
    const filterToken = q.toLowerCase();
    if (typeof q !== 'string' || q.length < 1) {
      setSuggestionsList(null);
      return;
    }

    setLoading(true);

    const suggestions: ISuggestionItem[] = (events as IEventItem[])
      .filter(item => item.title.toLowerCase().includes(filterToken))
      .map(item => ({
        id: item._id,
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
            useFilter={false}
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
          keyExtractor={item => item.id || item._id}
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

// const styles = StyleSheet.create({
//   rowContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 25,
//   },
// });

export default GuestList;
