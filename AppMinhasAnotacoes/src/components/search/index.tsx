import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function Search() {
  return (
    <View
      className='w-full flex-row border border-slate-300 h-13 rounded-full 
               items-center gap-2 px-4 mt-4 bg-gray-50'
    >

      <Feather
        name='search'
        size={22}
        color="64748b"
      />

      <TextInput
        placeholder='Busca'
        className='w-full h-full flex-1 bg-transparent' />
    </View>
  );
}