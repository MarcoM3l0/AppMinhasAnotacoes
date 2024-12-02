import { useEffect, useState } from "react";
import { View, SafeAreaView, Alert } from "react-native";
import { Header } from "../components/header";
import { Search } from "../components/search";
import { Footer } from "../components/footer";
import { NotesList } from "../components/notesList";
import { deleteNotes } from "../services/noteDelete"
import { fetchNotes } from "../services/noteGet";
import { toggleFavoriteNotes } from "../services/noteFavorite";
import { SearchNotes } from "../services/noteSearch"

import { useRouter } from "expo-router";



export default function Index() {

  const router = useRouter();

  const [selectedNotes, setSelectedNotes] = useState<number[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    // Carregar as notas assim que o componente for montado
    fetchNotes()
      .then(fetchedNotes => {
        setNotes(fetchedNotes); // Atualiza as notas com as informações recebidas da API
      })
      .catch(error => console.error("Erro ao carregar notas:", error));
  }, []);

  const handleSelectNote = (id: number) => {
    setSelectedNotes((prev) =>
      prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
    );
  };

  const handleToggleFavorite = async (ids: number[]) => {
    console.log("Favoritando notas:", ids);

    try {
      const results = await toggleFavoriteNotes(ids);
      console.log("Resultados da atualização:", results);

      setSelectedNotes([])

      // Navega para a mesma tela, "simulando" o reload
      const updatedNotes = await fetchNotes();
      setNotes(updatedNotes);

    } catch (error) {
      console.error("Erro ao alternar favoritos:", error);
    }



  };


  const handleEditNotes = (id: number[]) => {

    if (id.length > 1) {
      Alert.alert(
        "Erro",
        "Não é permitido passar mais de um ID para edição.",
        [{ text: "OK" }]
      );
      return;
    }else if(id.length == 0) {
      return;
    }

    router.push(`/EditNoteScreen?id=${id[0]}`);

  };

  const handleSearch = async (query: string) => {

    try {
      const data = await SearchNotes(query.trim())
      setFilteredNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNotes = async (ids: number[]) => {

    try {
      const result = await deleteNotes(ids);  // Chama a função de delete passando os IDs
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