import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export function Footer() {

  const toggleFavorite = () => {
    // Lógica para alternar o estado de "favorito"
    console.log("Toggled favorite status!");
  };

  return (
    <View className="p-4 mx-0 flex-row justify-around items-center h-full">

      {/* Botão de Adicionar Nota */}
      <TouchableOpacity className="items-center">
        <Ionicons name="add-circle" size={24} color="#4CAF50" />
        <Link href={"/CreateNoteScreen"} className="text-sm text-gray-700">Adicionar</Link>
      </TouchableOpacity>

      <TouchableOpacity className="items-center" onPress={toggleFavorite}>
        <Ionicons name="star-outline" size={24} color="#FFD700" />
        <Text className="text-sm text-gray-700">Favoritar</Text>
      </TouchableOpacity>

      {/* Botão de Editar Nota */}
      <TouchableOpacity className="items-center">
        <Ionicons name="create" size={24} color="#FF9800" />
        <Text className="text-sm text-gray-700">Abrir</Text>
      </TouchableOpacity>

      {/* Botão de Excluir Nota */}
      <TouchableOpacity className="items-center">
        <Ionicons name="trash" size={24} color="#F44336" />
        <Text className="text-sm text-gray-700">Excluir</Text>
      </TouchableOpacity>

    </View>
  );
}