// src/api/api.js
import axios from "axios";

// Função para buscar as notas da API
export const SearchNotes = async (query) => {
    
    try {
        const response = await axios.get(`http://192.168.0.100:8802/${encodeURIComponent(query)}`);
        console.log(response.data)
        return response.data;

    } catch (error) {
        throw new Error("Erro ao buscar notas: " + error);
    }
};
