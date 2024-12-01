import { Text, View, ScrollView } from "react-native";
import { Header } from "../components/header";
import { Search } from "../components/search";
import { Footer } from "../components/footer";
import { NotesList } from "../components/notesList/NotesList";
import { Link } from "expo-router";


export default function Index() {
  return (
    <View className="w-full px-4 bg-gray-100" style={{ flex: 1 }}>

      <Header />

      <Search />


      
      <NotesList />

      <View className="absolute bottom-0 left-4 w-full bg-gray-100">
        <Footer />
      </View>

    </View>
  );
}
