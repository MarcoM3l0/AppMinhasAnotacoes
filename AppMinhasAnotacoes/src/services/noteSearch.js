import { API_URL } from '@env';

// Função para buscar as notas da API
export const SearchNotes = async (query) => {
  const encodedQuery = encodeURIComponent(query);

  try {

    const response = await fetch(`${API_URL}${encodedQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar notas: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Dados da resposta:", data);
    return data;

  } catch (error) {
    console.error("Erro ao buscar notas:", error); // Trata erro
    throw new Error("Erro ao buscar notas: " + error);
  }
};
