import axios from "axios";
import { API_URL } from '@env';

// Função para salvar a nota no banco
export const saveNote = (noteData) => {

  const options = {
    method: 'POST',
    url: `${API_URL}`,  // URL do seu servidor
    headers: { 'Content-Type': 'application/json' },
    data: noteData, // Dados da nota
  };

  return axios
    .request(options)
    .then(response => response.data) // Retorna os dados da resposta
    .catch(error => {
      console.error(error); // Trata erro
      throw error; // Repassa o erro para quem chamou a função
    });
};
