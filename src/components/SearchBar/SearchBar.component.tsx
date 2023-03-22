import { StyleSheet, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_SCHEDULES } from '../../navigation/Navigation.config';
import useAppSelector from '../../hooks/useAppSelector.hook';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../slices/search.slice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEADER_PADDING_TOP, HEADER_SEARCH_HEIGHT } from './SearchBar.config';
import { XMarkIcon } from 'react-native-heroicons/outline';

function SearchBar() {
  const search = useAppSelector(state => state.search.value);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  function onSearchType(value: string) {
    dispatch(setSearch(value))
    // @ts-ignore
    navigate({ name: ROUTE_SCHEDULES});
  }

  function onClear() {
    dispatch(setSearch(''));
  }

  return <SafeAreaView style={styles.header}>
    <View style={styles.bar}>
      <TextInput
        placeholder="Search Line..."
        placeholderTextColor="rgba(255 255 255 / .8)"
        value={search}
        onChangeText={onSearchType}
        style={styles.input}
      />
      <XMarkIcon
        size={32}
        color="rgba(255 255 255 / .6)"
        style={ search.length ? styles.clear : { display: 'none' }}
        onPress={onClear}/>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: HEADER_PADDING_TOP,
    paddingHorizontal: 16,
    zIndex: 50
  },
  bar: {
    height: HEADER_SEARCH_HEIGHT,
    width: '100%',
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 24,
  },
  input: {
    width: '100%',
    height: '100%',
    paddingLeft: 16,
    paddingRight: 16+32,
    fontFamily: 'Inter_300Light',
    fontSize: 18,
    color: '#FFF',
  },
  clear: {
    position: 'absolute',
    right: 12,
    top: (HEADER_SEARCH_HEIGHT-32)/2
  }
});

export default SearchBar;