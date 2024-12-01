import axios from "axios";

// Função para salvar a nota no banco
export const saveNote = (noteData) => {
  const options = {
    method: 'POST',
    url: 'http://192.168.0.105:8802/',  // URL do seu servidor
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
