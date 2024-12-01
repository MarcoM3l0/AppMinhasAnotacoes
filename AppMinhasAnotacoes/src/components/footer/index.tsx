import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface FooterProps {
  selectedNotes: number[]; // IDs das notas selecionadas
  onToggleFavorite: (ids: number[]) => void; // Função para favoritar
  onDelete: (ids: number[]) => void; // Função para excluir
  onOpen: (ids: number[]) => void; // Função para abrir
}

export function Footer({ selectedNotes, onToggleFavorite, onDelete, onOpen }: FooterProps) {
  return (
    <View className="p-4 mx-0 flex-row justify-around items-center h-full">

      {/* Botão de Adicionar Nota */}
      <TouchableOpacity className="items-center">
        <Ionicons name="add-circle" size={24} color="#4CAF50" />
        <Link href={"/CreateNoteScreen"} className="text-sm text-gray-700">
          Adicionar
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

      {/* Botão de Abrir Nota */}
      <TouchableOpacity
        className="items-center"
        onPress={() => onOpen(selectedNotes)}
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
