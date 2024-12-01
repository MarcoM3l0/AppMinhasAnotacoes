// src/components/Card.tsx
import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Defina o tipo de propriedades do componente
interface CardProps {
  title: string;
  imageUrl?: string; // Torne imageUrl opcional
}

export function Card({ title, imageUrl }: CardProps) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleCheckbox = () => {
    setIsSelected(!isSelected);
  };

  return (
    <View className="flex-row items-center justify-between bg-white p-4 mt-3 gap-2 rounded-lg shadow-md mb-4">
      {/* Checkbox */}
      <Pressable onPress={toggleCheckbox}>
        {isSelected ? (
          <Ionicons name="checkbox" size={24} color="#4CAF50" />
        ) : (
          <Ionicons name="square-outline" size={24} color="#777" />
        )}
      </Pressable>

      {/* Conteúdo principal */}
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
      </View>

      {/* Imagem opcional */}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          className="w-16 h-16 ml-4 rounded-md"
          resizeMode="cover"
        />
      )}
    </View>
  );
}
