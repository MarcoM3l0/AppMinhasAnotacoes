// src/api/api.js
import axios from "axios";
import { API_URL } from '@env';


// Função para buscar as notas da API
export const SearchNotes = async (query) => {
    
    try {
        const response = await axios.get(`${API_URL}/${encodeURIComponent(query)}`);
        console.log(response.data)
        return response.data;

    } catch (error) {
        throw new Error("Erro ao buscar notas: " + error);
    }
};
