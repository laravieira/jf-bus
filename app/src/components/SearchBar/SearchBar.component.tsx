import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_SCHEDULES } from '../../constants';
import useAppSelector from '../../hooks/useAppSelector.hook';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../slices/search.slice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEADER_PADDING_TOP } from './SearchBar.config';
import InputField from '../InputField';

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
    <InputField
      onType={onSearchType}
      value={search}
      placeholder="Search Line..."
      onClear={onClear}
    />
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
});

export default SearchBar;