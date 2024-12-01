import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter, useLocalSearchParams } from "expo-router";

import { updateNote } from "../services/noteUpdate";
import { fetchNotesById } from "../services/noteGetID"

export default function EditNoteScreen() {


    const router = useRouter();
    const { id } = useLocalSearchParams();


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#fff');
    const [image, setImage] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    const ensureString = (value: string | string[] | undefined): string => {
        if (Array.isArray(value)) {
            return value[0] || ''; // Pega o primeiro valor do array, se existir
        }
        return value || ''; // Retorna o valor ou uma string vazia se for undefined
    };

    // Pré-preencher os campos ao carregar a nota
    useEffect(() => {

        console.log("1°:" + title)
        const fetchNoteData = async () => {
            try {
                const noteData = await fetchNotesById(id); // Busca a nota com o ID
                console.log("Aqui: " + noteData)

                setTitle(ensureString(noteData.titulo));
                setContent(ensureString(noteData.conteudo));
                setTag(ensureString(noteData.etiqueta));
                setBackgroundColor(ensureString(noteData.cor_fundo) || '#fff');
                setImage(ensureString(noteData.imagem));
                setIsFavorite(noteData.favorito === true); // Assume que favorito é booleano



            } catch (error) {
                console.error("Erro ao buscar nota:", error);
                router.push('/'); // Voltar para a tela inicial

            }
        };

        fetchNoteData();


    }, [id]);


    // Função para salvar ou editar a nota
    const handleSaveNote = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Título e conteúdo são obrigatórios.");
            return;
        }

        const noteData = {
            id,
            titulo: title,
            conteudo: content,
            cor_fundo: backgroundColor,
            etiqueta: tag,
            imagem: image,
            favorito: isFavorite,
        };

        try {
            await updateNote(noteData); // Editar nota
            alert("Nota atualizada com sucesso!");
            router.push('/'); // Voltar para a tela inicial
        } catch (error) {
            console.error("Erro ao salvar a nota:", error);
            router.push('/'); // Voltar para a tela inicial
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100 p-4">
            <ScrollView>
                <Text className="text-2xl font-bold text-gray-800 mb-4">
                    Editar Nota
                </Text>

                <TextInput
                    className="bg-white p-3 rounded-lg shadow-md text-lg mb-4"
                    placeholder="Título da nota"
                    value={title}
                    onChangeText={setTitle}
                />

                <TextInput
                    className="bg-white p-3 rounded-lg shadow-md text-lg h-40 mb-4"
                    placeholder="Escreva aqui..."
                    value={content}
                    onChangeText={setContent}
                    multiline
                />

                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-700 mb-2">Etiqueta</Text>
                    <TextInput
                        className="bg-white p-3 rounded-lg shadow-md text-lg"
                        placeholder="Digite a etiqueta"
                        value={tag}
                        onChangeText={setTag}
                    />
                </View>

                <View className="flex-row justify-between">
                    <TouchableOpacity className="bg-red-500 p-4 rounded-lg shadow-md flex-1 mr-2">
                        <Link href=".." className="text-white text-center text-lg">Descartar</Link>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-blue-700 p-4 rounded-lg shadow-md flex-1 ml-2"
                        onPress={handleSaveNote}
                    >
                        <Text className="text-white text-center text-lg">Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
