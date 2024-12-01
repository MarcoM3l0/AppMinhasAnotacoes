// src/api/api.js
import axios from "axios";
import { API_URL } from '@env';

// Função para buscar as notas pela ID
export const fetchNotesById = async (id) => {
    try {
        const response = await axios.get(`http://192.168.0.101:8802/${id}`); // Concatenando o ID à URL da API
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        throw new Error("Erro ao buscar notas: " + error);
    }
};
