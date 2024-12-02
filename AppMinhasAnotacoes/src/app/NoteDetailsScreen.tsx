import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type NoteDetailsParams = {
    id: number;
    titulo: string;
    conteudo: string;
    cor_fundo: string;
    etiqueta: string;
    imagem: string;
    data_criacao: string;
    data_edicao: string;
    favorito: number
}

const NoteDetailsScreen = () => {
    const route = useRoute();
    const router = useRouter();
    const { id, titulo, conteudo, cor_fundo, etiqueta, imagem, data_criacao, data_edicao, favorito } = route.params as NoteDetailsParams

    return (
        <View className={`flex-1 p-6 ${cor_fundo ? `bg-[${cor_fundo}]` : "bg-white"} rounded-lg shadow-lg`}>

            <Text className="text-4xl font-bold mb-4 text-center">{titulo}</Text>
            <Text className="text-lg mb-6 leading-relaxed">{conteudo}</Text>
            {imagem ? <Image className="w-full h-72 rounded-lg mb-6" source={{ uri: imagem }} /> : null}
            <Text className="text-base text-gray-700 mb-2">Etiqueta: {etiqueta}</Text>
            <Text className="text-base text-gray-700 mb-2">Criado em: {new Date(data_criacao).toLocaleString()}</Text>
            <Text className="text-base text-gray-700">Última edição: {new Date(data_edicao).toLocaleString()}</Text>



            <TouchableOpacity onPress={() => router.push("/")} className="bg-gray-200 p-3 rounded-lg flex-row items-center mb-4">
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text className="text-black text-lg ml-2">Voltar</Text>
            </TouchableOpacity>

        </View>
    )
}
export default NoteDetailsScreen;
