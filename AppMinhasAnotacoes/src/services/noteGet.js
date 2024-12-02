import axios from "axios";
import { API_URL } from '@env';

// Função para buscar as notas da API
export const fetchNotes = async () => {

    try {
        const response = await axios.get(`${API_URL}`);
        return response.data; 
    } catch (error) {
        throw new Error("Erro ao buscar notas: " + error);
    }
};


