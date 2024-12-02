import { useEffect, useState } from "react";
import { View, SafeAreaView, Alert } from "react-native";
import { Header } from "../components/header";
import { Search } from "../components/search";
import { Footer } from "../components/footer";
import { NotesList } from "../components/notesList";
import { deleteNotes } from "../services/noteDelete";
import { fetchNotes } from "../services/noteGet";
import { toggleFavoriteNotes } from "../services/noteFavorite";
import { SearchNotes } from "../services/noteSearch";
import { useRouter } from "expo-router";

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

/**
 * Componente principal da aplicação.
 * 
 * @returns {JSX.Element} O componente renderizado.
 */
export default function Index() {
  const router = useRouter();

  // Estado para as notas selecionadas
  const [selectedNotes, setSelectedNotes] = useState<number[]>([]);

  // Estado para todas as notas
  const [notes, setNotes] = useState<any[]>([]);

  // Estado para as notas filtradas (resultado de uma busca)
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    // Carregar as notas assim que o componente for montado
    fetchNotes()
      .then(fetchedNotes => {
        setNotes(fetchedNotes); // Atualiza as notas com as informações recebidas da API
      })
      .catch(error => console.error("Erro ao carregar notas:", error));
  }, []);

  /**
   * Função para selecionar ou desmarcar uma nota.
   * 
   * @param {number} id - O ID da nota a ser selecionada ou desmarcada.
   */
  const handleSelectNote = (id: number) => {
    setSelectedNotes((prev) =>
      prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
    );
  };

  /**
   * Função para alternar o estado de favorito das notas selecionadas.
   * 
   * @param {number[]} ids - IDs das notas a serem marcadas ou desmarcadas como favoritas.
   */
  const handleToggleFavorite = async (ids: number[]) => {
    console.log("Favoritando notas:", ids);

    try {
      toggleFavoriteNotes(ids);

      setSelectedNotes([]); // Limpa a seleção após a ação

      // Navega para a mesma tela, "simulando" o reload
      const updatedNotes = await fetchNotes();
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Erro ao alternar favoritos:", error);
    }
  };

  /**
   * Função para editar uma nota específica.
   * 
   * @param {number[]} id - O ID da nota a ser editada.
   */
  const handleEditNotes = (id: number[]) => {
    if (id.length > 1) {
      Alert.alert(
        "Erro",
        "Não é permitido passar mais de um ID para edição.",
        [{ text: "OK" }]
      );
      return;
    } else if (id.length == 0) {
      return;
    }

    const Id = Number(id);

    const note: Note = notes.find(n => n.id === Id) as Note;

    router.push({
      pathname: "/EditNoteScreen",
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


  };

  /**
   * Função para buscar notas pelo titulo.
   * 
   * @param {string} query - A consulta de busca.
   */
  const handleSearch = async (query: string) => {
    try {
      const data = await SearchNotes(query.trim());
      setFilteredNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Função para deletar notas selecionadas.
   * 
   * @param {number[]} ids - IDs das notas a serem deletadas.
   */
  const handleDeleteNotes = async (ids: number[]) => {
    try {
      const result = await deleteNotes(ids); // Chama a função de delete passando os IDs
      console.log('Notas deletadas:', result);

      setSelectedNotes([]); // Limpa a seleção após deletar

      // Navega para a mesma tela, "simulando" o reload
      const updatedNotes = await fetchNotes();
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Erro ao deletar notas:', error);
    }
  };

  return (
    <View className="w-full px-4 bg-gray-100" style={{ flex: 1 }}>

      <Header />

      <Search onSearch={handleSearch} />

      <SafeAreaView className="flex-1">
        <View className="flex-1 pb-24 pt-1">
          <NotesList
            filteredNotes={filteredNotes}
            notas={notes}
            onSelectNote={handleSelectNote}
            selectedNotes={selectedNotes}
          />
        </View>

        <View className="absolute bottom-0 left-0 right-0 bg-gray-100">
          <Footer
            selectedNotes={selectedNotes}
            onToggleFavorite={handleToggleFavorite}
            onEdit={handleEditNotes}
            onDelete={handleDeleteNotes}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
