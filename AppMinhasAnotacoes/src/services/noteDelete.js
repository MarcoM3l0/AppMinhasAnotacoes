import { API_URL } from '@env';

export const deleteNotes = async (ids) => {
    try {

        // Se for uma lista de IDs, faz o loop e deleta cada um deles
        if (Array.isArray(ids)) {
            // Loop para deletar um ID por vez
            const results = [];
            for (const id of ids) {
                const response = await fetch(`${API_URL}${id}`, {
                    method: 'DELETE',
                    headers: {
                        'User-Agent': 'insomnia/10.2.0',
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erro ao deletar nota com ID ${id}: ${response.statusText}`);
                }

                // Adiciona a resposta da exclusão ao array de resultados
                const data = await response.json();
                results.push(data);
            }

            return results; // Retorna os resultados de todas as exclusões
        } else {
            // Deletando uma única nota
            const response = await fetch(`${url}${ids}`, {
                method: 'DELETE',
                headers: {
                    'User-Agent': 'insomnia/10.2.0',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao deletar nota com ID ${ids}: ${response.statusText}`);
            }

            // Retorna a resposta da exclusão
            return await response.json();
        }
    } catch (error) {
        throw new Error("Erro ao deletar notas: " + error.message);
    }
};
