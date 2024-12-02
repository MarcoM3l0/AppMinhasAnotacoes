import axios from "axios";
import { API_URL } from '@env';

// Função para salvar a nota no banco
export const saveNote = (noteData) => {

  const options = {
    method: 'POST',
    url: `${API_URL}`,  
    headers: { 'Content-Type': 'application/json' },
    data: noteData, 
  };

  return axios
    .request(options)
    .then(response => response.data) 
    .catch(error => {
      console.error(error); 
      throw error; 
    });
};
