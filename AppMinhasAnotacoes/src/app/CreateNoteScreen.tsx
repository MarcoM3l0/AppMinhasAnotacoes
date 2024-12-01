import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";



import { saveNote } from '../services/noteCreate';


export default function CreateNoteScreen() {

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#fff'); // Cor de fundo
    const [image, setImage] = useState(''); // Nome da imagem
    const [isFavorite, setIsFavorite] = useState(false); // Favorito

    // Função para salvar a nota
    const handleSaveNote = async () => {

        // Verifica se título e conteúdo não estão vazios
        if (!title.trim() || !content.trim()) {
            alert("Título e conteúdo são obrigatórios.");
            return;
        }

        // Verifica se o título não é muito grande (exemplo: máximo de 100 caracteres)
        if (title.length > 100) {
            alert("O título não pode ser maior que 100 caracteres.");
            return;
        }

        const noteData = {
            titulo: title,
            conteudo: content,
            cor_fundo: backgroundColor,
            etiqueta: tag,
            imagem: image,
            favorito: isFavorite,
        };

        try {
            const response = await saveNote(noteData); // Chamando o serviço para salvar
            console.log(response); // Exibe a resposta da API no console
            router.push('/'); // Após salvar, redireciona para a tela inicial
        } catch (error) {
            console.error("Erro ao salvar a nota:", error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100 p-4">
            <ScrollView>
                {/* Título */}
                <Text className="text-2xl font-bold text-gray-800 mb-4">Criar Nota</Text>

                {/* Campo: Título */}
                <TextInput
                    className="bg-white p-3 rounded-lg shadow-md text-lg mb-4"
                    placeholder="Título da nota"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* Campo: Conteúdo */}
                <TextInput
                    className="bg-white p-3 rounded-lg shadow-md text-lg h-40 mb-4"
                    placeholder="Escreva aqui..."
                    value={content}
                    onChangeText={setContent}
                    multiline
                />

                {/* Botões de ação */}
                <View className="flex-row justify-between mb-6">
                    {/* Adicionar Imagem */}
                    <TouchableOpacity className="flex-1 mx-1 bg-blue-500 rounded-lg shadow-md p-4 flex-row items-center justify-center">
                        <Ionicons name="image-outline" size={24} color="white" />
                        <Text className="text-white text-center font-semibold ml-2">Imagem</Text>
                    </TouchableOpacity>



                </View>

                {/* Escolher Cor */}
                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-700 mb-2">Cor</Text>
                    <TextInput
                        className="bg-white p-3 rounded-lg shadow-md text-lg"
                        placeholder="Digite o código Hexadecimal da cor"
                        value={backgroundColor}
                        onChangeText={(text) => {
                            // Remover espaços em branco
                            let formattedText = text.trim();

                            // Garantir que o texto comece com '#' se não estiver vazio
                            if (formattedText && !formattedText.startsWith('#')) {
                                formattedText = `#${formattedText}`;
                            }

                            // Verificar se o texto contém apenas caracteres hexadecimais e limitar a 7 caracteres no total
                            const regex = /^#[a-fA-F0-9]{0,6}$/;

                            // Se o texto passar na regex, permite que o valor seja atualizado
                            if (regex.test(formattedText)) {
                                setBackgroundColor(formattedText);
                            }
                        }}
                    />
                </View>




                {/* Campo: Etiqueta */}
                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-700 mb-2">Etiqueta</Text>
                    <TextInput
                        className="bg-white p-3 rounded-lg shadow-md text-lg"
                        placeholder="Digite a etiqueta"
                        value={tag}
                        onChangeText={setTag}
                    />
                </View>

                {/* Botões de Salvar/Descartar */}
                <View className="flex-row justify-between">
                    {/* Descartar */}
                    <TouchableOpacity className="bg-red-500 p-4 rounded-lg shadow-md flex-1 mr-2">
                        <Link href=".." className="text-white text-center text-lg">Descartar</Link>
                    </TouchableOpacity>

                    {/* Salvar */}
                    <TouchableOpacity className="bg-blue-700 p-4 rounded-lg shadow-md flex-1 ml-2" onPress={handleSaveNote}>
                        <Text className="text-white text-center text-lg">Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};