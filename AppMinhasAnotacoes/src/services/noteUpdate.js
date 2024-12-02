import { API_URL } from '@env';

// Função para editar a nota no banco
export const updateNote = async (noteData) => {

  console.log(noteData)
  const putResponse = await fetch(`${API_URL}${noteData.id}`, {
    method: 'PUT',
    headers: {
      'User-Agent': 'insomnia/10.2.0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(noteData) // Envia todos os dados da nota
  });

  if (!putResponse.ok) {
    throw new Error(`Erro ao atualizar a nota com ID ${noteData.id}: ${putResponse.statusText}`);
  }

};
