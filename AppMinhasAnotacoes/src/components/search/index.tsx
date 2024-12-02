import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Componente de busca que permite ao usuário digitar o titulo de uma nota
 * 
 * @param {Object} props - Propriedades do componente.
 * @param {function(string): void} props.onSearch - Função a ser chamada quando a busca for executada.
 * @returns {JSX.Element} O componente de busca renderizado.
 */
export function Search({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  return (
    <View className='w-full flex-row border border-slate-300 h-13 rounded-full items-center gap-2 px-4 mt-4 bg-gray-50'>
      <Feather name='search' size={22} color="64748b" />

      <TextInput
        placeholder='Busca'
        className='w-full h-full flex-1 bg-transparent'
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => onSearch(query)} // Chamando a função ao pressionar Enter
      />
    </View>
  );
}
