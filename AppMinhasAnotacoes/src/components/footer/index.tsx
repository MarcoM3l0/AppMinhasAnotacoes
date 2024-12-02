import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface FooterProps {
  selectedNotes: number[]; 
  onToggleFavorite: (ids: number[]) => void;
  onDelete: (ids: number[]) => void;
  onEdit: (id: number[]) => void;
}

/**
 * Componente de rodapé com ações para as notas selecionadas.
 * 
 * @param {Object} props - Propriedades do componente.
 * @param {number[]} props.selectedNotes - IDs das notas selecionadas.
 * @param {function(number[]): void} props.onToggleFavorite - Função para favoritar as notas selecionadas.
 * @param {function(number[]): void} props.onDelete - Função para excluir as notas selecionadas.
 * @param {function(number[]): void} props.onEdit - Função para editar a nota selecionada.
 * @returns {JSX.Element} O componente de rodapé renderizado.
 */
export function Footer({ selectedNotes, onToggleFavorite, onDelete, onEdit }: FooterProps) {
  return (
    <View className="p-4 flex-row justify-around items-center">

      {/* Botão de Adicionar Nota */}
      <TouchableOpacity className="items-center">
        <Link href={"/CreateNoteScreen"} className="text-sm text-gray-700">
          <Ionicons name="add-circle" size={24} color="#4CAF50"/>
        </Link>
        <Link href={"/CreateNoteScreen"} className="text-sm text-gray-700">
          <Text>Adicionar</Text>
        </Link>
      </TouchableOpacity>

      {/* Botão de Favoritar */}
      <TouchableOpacity
        className="items-center"
        onPress={() => onToggleFavorite(selectedNotes)}
      >
        <Ionicons name="star-outline" size={24} color="#FFD700" />
        <Text className="text-sm text-gray-700">Favoritar</Text>
      </TouchableOpacity>

      {/* Botão de Editar Nota */}
      <TouchableOpacity
        className="items-center"
        onPress={() => onEdit(selectedNotes)}
      >
        <Ionicons name="create" size={24} color="#FF9800" />
        <Text className="text-sm text-gray-700">Editar</Text>
      </TouchableOpacity>

      {/* Botão de Excluir Nota */}
      <TouchableOpacity
        className="items-center"
        onPress={() => onDelete(selectedNotes)}
      >
        <Ionicons name="trash" size={24} color="#F44336" />
        <Text className="text-sm text-gray-700">Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}
