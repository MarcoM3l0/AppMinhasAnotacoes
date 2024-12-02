import React, { useState, useEffect } from "react";
import { SectionList, Text, View, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

import { fetchNotes } from "@/src/services/noteGet";

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
  onSelectNote: (id: number) => void; 
  selectedNotes: number[]; 
  filteredNotes?: Note[];
}

/**
 * Componente que exibe uma lista de notas agrupadas por seção.
 * 
 * @param {Object} props - Propriedades do componente.
 * @param {Note[]} props.notas - Lista de todas as notas.
 * @param {function(number): void} props.onSelectNote - Função para selecionar/deselecionar uma nota.
 * @param {number[]} props.selectedNotes - IDs das notas selecionadas.
 * @param {Note[]} [props.filteredNotes] - Lista de notas filtradas (opcional).
 * @returns {JSX.Element} O componente de lista de notas renderizado.
 */
export function NotesList({ notas, onSelectNote, selectedNotes, filteredNotes }: NotesListProps) {
  const [notes, setNotes] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Definir os dados a serem exibidos
  const filteredData = filteredNotes && filteredNotes.length > 0 ? filteredNotes : notas;

  /**
   * Função para abrir os detalhes de uma nota.
   * 
   * @param {number} id - O ID da nota a ser aberta.
   */
  const handleOpenNotes = (id: number): void => {
    const filteredNote = notes[1].data.filter(note => note.id === id);

    if (filteredNote.length > 0) {
      const note = filteredNote[0]; // Pegua a primeira (e única) nota filtrada
      router.push({
        pathname: "/NoteDetailsScreen", 
        params: {
          id: note.id, 
          titulo: note.titulo, 
          conteudo: note.conteudo, 
          cor_fundo: note.cor_fundo, 
          etiqueta: note.etiqueta, 
          imagem: note.imagem, 
          data_criacao: note.data_criacao, 
          data_edicao: note.data_edicao, 
          favorito: note.favorito ? 1 : 0,
        },
      });
    }
  }

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
  }, [filteredNotes, notas]); 

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
          <TouchableOpacity onPress={() => handleOpenNotes(item.id)} className="w-full h-full">
            <View className="flex-row items-center justify-between bg-white p-4 mt-3 gap-2 rounded-lg shadow-md mb-4"
              style={{ backgroundColor: item.cor_fundo || '#fff' }}>

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

              {/* Titulo */}
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">{item.titulo}</Text>
              </View>


              {/* Etiqueta */}
              <View className="flex-1">
                <Text className="text-lg text-gray-800">{item.etiqueta}</Text>
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
          </TouchableOpacity>
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
