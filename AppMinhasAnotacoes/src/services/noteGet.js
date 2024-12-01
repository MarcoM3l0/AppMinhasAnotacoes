// src/api/api.js
import axios from "axios";

// Função para buscar as notas da API
export const fetchNotes = async () => {
    try {
        const response = await axios.get('http://192.168.0.109:8802/');
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        throw new Error("Erro ao buscar notas: " + error);
    }
};
