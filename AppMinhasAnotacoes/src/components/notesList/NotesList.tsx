import React, { useState, useEffect } from "react";
import { SectionList, Text, View, ActivityIndicator, Image } from "react-native";
import { Card } from "../card/index";
import { fetchNotes } from "@/src/services/noteGet";

// Ajustando o tipo Note conforme a estrutura de dados fornecida
interface Note {
  id: number;
  titulo: string;
  conteudo: string;
  cor_fundo?: string;
  etiqueta?: string;
  imagem?: string;
  data_criacao: string; // ou Date, dependendo de como os dados são manipulados
  data_edicao: string;  // ou Date
  favorito: boolean;
}

interface Section {
  title: string;
  data: Note[];
}

export function NotesList() {
  const [notes, setNotes] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        const sections = [
          {
            title: 'Favoritas',
            data: data.filter((item: Note) => item.favorito),
          },
          {
            title: 'Outras',
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
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SectionList
      sections={notes}
      keyExtractor={(item: Note) => item.id.toString()}
      renderItem={({ item }: { item: Note }) => (
        <Card
          title={item.titulo}
          imageUrl={item.imagem}
        />
      )}
      renderSectionHeader={({ section }) => (
        <View style={{ backgroundColor: '#f1f1f1', padding: 5 }}>
          <Text style={{ fontWeight: 'bold' }}>{section.title}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
