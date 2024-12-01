import { View, Pressable, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons"

export function Header() {
    return (
        <View className="mt-6 justify-center items-center">
            <Text className="flex-row items-center" >
                <Ionicons name="create" size={25} />
                <Text style={{ fontSize: 22 }} className="text-lg font-bold ml-2"> Minhas Anotações</Text>
            </Text>
        </View>
    )
}