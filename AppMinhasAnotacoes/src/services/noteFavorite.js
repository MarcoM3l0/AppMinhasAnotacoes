import { API_URL } from '@env';

export const toggleFavoriteNotes = async (ids) => {
    try {
        const idsArray = Array.isArray(ids) ? ids : [ids];

        const results = [];
        for (const id of idsArray) {
            // Passo 1: Buscar o estado atual da nota
            const getResponse = await fetch(`${API_URL}${id}`, {
                method: 'GET',
                headers: {
                    'User-Agent': 'insomnia/10.2.0'
                }
            });

            if (!getResponse.ok) {
                throw new Error(`Erro ao buscar nota com ID ${id}: ${getResponse.statusText}`);
            }

            const nota = await getResponse.json();

            // Acessa o primeiro item do array e alterna o valor de favorito
            const favoritoAtual = nota[0].favorito;
            const novoFavorito = favoritoAtual === 0 ? 1 : 0; // 0 -> não favorito, 1 -> favorito

            // Passo 2: Criar o corpo da requisição com todos os dados da nota
            const dadosNota = {
                id: nota[0].id,
                titulo: nota[0].titulo,
                conteudo: nota[0].conteudo,
                cor_fundo: nota[0].cor_fundo,
                etiqueta: nota[0].etiqueta,
                imagem: nota[0].imagem,
                data_criacao: nota[0].data_criacao,  // Você pode escolher se quer ou não enviar esse campo
                data_edicao: new Date().toISOString(), // Atualizando a data de edição
                favorito: novoFavorito // O campo favorito será atualizado
            };

            console.log("Dados completos da nota para atualização: ", JSON.stringify(dadosNota, null, 2));

            // Passo 3: Atualizar o valor do campo favorito e outros campos
            const putResponse = await fetch(`${API_URL}${id}`, {
                method: 'PUT',
                headers: {
                    'User-Agent': 'insomnia/10.2.0',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosNota) // Envia todos os dados da nota
            });

            if (!putResponse.ok) {
                throw new Error(`Erro ao atualizar a nota com ID ${id}: ${putResponse.statusText}`);
            }
        }

        return results; // Retorna os resultados de todas as atualizações
    } catch (error) {
        console.error("Erro ao alternar favoritos:", error.message);
        throw new Error("Erro ao alternar favoritos: " + error.message);
    }
};
