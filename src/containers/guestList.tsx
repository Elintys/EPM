import { View, Text, Platform, Button, Dimensions, FlatList, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AutocompleteDropdown, IAutocompleteDropdownRef } from 'react-native-autocomplete-dropdown';
import events from '../data/events.json';
import allGuests from '../data/guests.json';
import { StyleSheet } from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme, { Colors } from '../constants/styles/theme';
import GuestItem from '../components/GuestItem';

interface SuggestionItem {
    id: string;
    title: string;
}

interface EventItem {
    id: string;
    title: string;
    [key: string]: any;
}

interface Guest {
  id: string;
  eventId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  checkedIn: boolean;
  avatar: string;
  // Add any other required properties here
  [key: string]: any;
}

  const getEventGuests = (eventId: string): Guest[] => {
    if (!eventId) return [];
    return allGuests
      .filter(guest => guest.eventId === eventId)
      .map(guest => ({
        ...guest,
        checkedIn: typeof guest.checkedIn === 'boolean' ? guest.checkedIn : false,
        avatar: typeof guest.avatar === 'string' ? guest.avatar : '',
      }));
  };
  
const GuestList = () => {
  const [loading, setLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState<SuggestionItem[] | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const dropdownController = useRef<IAutocompleteDropdownRef | null>(null)
  const [guests, setGuests] = useState<Guest[]>(getEventGuests(selectedItem || ''));

  const searchRef = useRef(null)



const getSuggestions = useCallback(
    async (q: string) => {
        const filterToken = q.toLowerCase();
        console.log('getSuggestions', q);
        if (typeof q !== 'string' || q.length < 1) {
            setSuggestionsList(null);
            return;
        }
        setLoading(true);

        const suggestions: SuggestionItem[] = (events as EventItem[])
            .filter(item => item.title.toLowerCase().includes(filterToken))
            .map(item => ({
                id: item.id,
                title: item.title,
            }));
        setSuggestionsList(suggestions);
        setLoading(false);
    },
    []
);

useEffect(() => {
    setGuests(getEventGuests(selectedItem || ''));
}, [selectedItem]);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])

  const onOpenSuggestionsList = useCallback((_isOpened: any) => {}, [])

  return (
    <View style={theme.container}>
        
      <View>
        <AutocompleteDropdown
          ref={searchRef}
          controller={controller => {
            dropdownController.current = controller
          }}
          // initialValue={'1'}
          direction={Platform.select({ ios: 'down' })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={item => {
            item && setSelectedItem(item.id)
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: 'Selectionner un evenement',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
            //   backgroundColor: '#383b42',
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
            // backgroundColor: '#383b42',
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: Colors.neutral400,
            borderRadius: 5,
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, _text) => <Text style={{ color: Colors.neutral700, padding: 15 }}>{item.title}</Text>}
        //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
        //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
          //  showClear={false}
        />
        <View style={{ width: 10 }} />
        {/* <Button  title="Toggle" onPress={() => dropdownController?.current && dropdownController.current.toggle()} /> */}
      </View>

      <View style={{ flex: 1, marginTop:25}}>
        <FlatList
          data={guests}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            guests.length > 0 ? <View>
                <GuestItem guest={item} />
              <Text style={{ color: '#fff', padding: 15 }}>{item.name}</Text>
            </View>: <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={{ color: '#db1a1aff', padding: 15 }}>Aucun invité pour cet événement</Text></View>
          )}
        />
      </View>
    </View>
  )
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
