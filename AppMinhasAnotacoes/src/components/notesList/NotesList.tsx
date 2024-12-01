import React, { useState, useEffect } from "react";
import {
  SectionList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";

import { fetchNotes } from "@/src/services/noteGet";

// Definição do tipo Note
interface Note {
  id: number;
  titulo: string;
  conteudo: string;
  cor_fundo?: string;
  etiqueta?: string;
  imagem?: string;
  data_criacao: string;
  data_edicao: string;
  favorito: boolean;
}

interface Section {
  title: string;
  data: Note[];
}

interface NotesListProps {
  notas: Note[];
  onSelectNote: (id: number) => void; // Função para selecionar/deselecionar nota
  selectedNotes: number[]; // IDs das notas selecionadas
  filteredNotes?: Note[];
}

export function NotesList({ notas, onSelectNote, selectedNotes, filteredNotes }: NotesListProps) {
  const [notes, setNotes] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  // Definir os dados a serem exibidos
  const filteredData = filteredNotes && filteredNotes.length > 0 ? filteredNotes : notas;
  

  useEffect(() => {
    if (!filteredNotes || filteredNotes.length === 0) {
      const loadNotes = async () => {
        try {
          const data = await fetchNotes();
          const sections = [
            {
              title: "Favoritas",
              data: data.filter((item: Note) => item.favorito),
            },
            {
              title: "Outras",
              data: data.filter((item: Note) => !item.favorito),
            },
          ];
          setNotes(sections);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      loadNotes();
    } else {
      const sections = [
        {
          title: "Favoritas",
          data: filteredNotes.filter((item: Note) => item.favorito),
        },
        {
          title: "Outras",
          data: filteredNotes.filter((item: Note) => !item.favorito),
        },
      ];
      setNotes(sections);
    }
  }, [filteredNotes, notas]); // A dependência de `notas` deve ser mantida se a lista de notas for dinâmica

  // Verifica se ainda está carregando
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SectionList
      sections={notes} // Usa as notas filtradas ou todas as notas
      keyExtractor={(item: Note) => item.id.toString()}
      renderItem={({ item }: { item: Note }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          {/* Card */}
          <View className="flex-row items-center justify-between bg-white p-4 mt-3 gap-2 rounded-lg shadow-md mb-4">

            {/* Checkbox */}
            <TouchableOpacity
              onPress={() => onSelectNote(item.id)}
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: selectedNotes.includes(item.id) ? "green" : "#ccc",
                backgroundColor: selectedNotes.includes(item.id)
                  ? "green"
                  : "transparent",
                marginRight: 10,
              }}
            />

            {/* Conteúdo principal */}
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-800">{item.titulo}</Text>
            </View>

            {/* Imagem opcional */}
            {item.imagem && (
              <Image
                source={{ uri: item.imagem }}
                className="w-16 h-16 ml-4 rounded-md"
                resizeMode="cover"
              />
            )}
          </View>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={{ backgroundColor: "#f1f1f1", padding: 5 }}>
          <Text style={{ fontWeight: "bold" }}>{section.title}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
