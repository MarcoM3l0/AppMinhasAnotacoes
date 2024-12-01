import axios from "axios";
import { API_URL } from '@env';

// Função para editar a nota no banco
export const updateNote = (noteData) => {

  const options = {
    method: 'PUT',
    url: `${API_URL}/${noteData.id}`, // URL do seu servidor com o ID da nota
    headers: { 'Content-Type': 'application/json' },
    data: noteData, // Dados atualizados da nota
  };

  return axios
    .request(options)
    .then(response => response.data) // Retorna os dados da resposta
    .catch(error => {
      console.error(error); // Trata erro
      throw error; // Repassa o erro para quem chamou a função
    });
};
