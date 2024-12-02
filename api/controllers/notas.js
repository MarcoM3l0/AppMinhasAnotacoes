import { db } from "../db.js";

/**
 * Obtém todas as notas do banco de dados.
 *
 * @param {Object} _ - O objeto de requisição (não utilizado).
 * @param {Object} res - O objeto de resposta para enviar os resultados.
 */
export const getNotas = (_, res) => {

    const q = "SELECT * FROM notas";

    db.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });

}

/**
 * Obtém uma nota específica com base no ID ou título.
 *
 * @param {Object} req - O objeto de requisição contendo parâmetros.
 * @param {Object} res - O objeto de resposta para enviar os resultados.
 */
export const getNota = (req, res) => {
    
    const search = req.params.search;

    // Determina se o parâmetro é um ID (número) ou um título (string)
    const isNumeric = !isNaN(search);

    const q = isNumeric
        ? "SELECT * FROM notas WHERE id = ?"
        : "SELECT * FROM notas WHERE titulo LIKE ?";

    // Usa o parâmetro correto na consulta
    const queryParam = isNumeric ? search : `%${search}%`;

    db.query(q, [queryParam], (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });

}

/**
 * Cria uma nova nota no banco de dados.
 *
 * @param {Object} req - O objeto de requisição contendo os dados da nova nota.
 * @param {Object} res - O objeto de resposta para enviar os resultados.
 */
export const postNota = (req, res) => {

    const q = `INSERT INTO notas (titulo, conteudo, cor_fundo, etiqueta, imagem, favorito)
        VALUES (?, ?, ?, ?, ?, ?)`;

    const { titulo, conteudo, cor_fundo, etiqueta, imagem, favorito } = req.body;

    db.query(q, [titulo, conteudo, cor_fundo, etiqueta, imagem, favorito], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao criar a nota", error: err });
        }
        
        return res.status(201).json({ message: "Nota criada com sucesso", data });
    });

}

/**
 * Atualiza uma nota existente no banco de dados.
 *
 * @param {Object} req - O objeto de requisição contendo os dados atualizados.
 * @param {Object} res - O objeto de resposta para enviar os resultados.
 */
export const updateNota = (req, res) => {
    
    const q = `UPDATE notas SET titulo = ?, conteudo = ?, cor_fundo = ?, etiqueta = ?, imagem = ?, 
        favorito = ? WHERE id = ?;`;

    const { id } = req.params; 
    const { titulo, conteudo, cor_fundo, etiqueta, imagem, favorito } = req.body; 

    // Executa a query no banco de dados
    db.query(q, [titulo, conteudo, cor_fundo, etiqueta, imagem, favorito, id], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao atualizar a nota", error: err });
        }

        return res.status(200).json({ message: "Nota atualizada com sucesso", data });
    });
};

/**
 * Deleta uma nota existente no banco de dados.
 *
 * @param {Object} req - O objeto de requisição contendo o ID da nota a ser deletada.
 * @param {Object} res - O objeto de resposta para enviar os resultados.
 */
export const deleteNota = (req, res) => {

    // SQL para deletar a nota com o ID fornecido
    const q = "DELETE FROM notas WHERE id = ?";

    const { id } = req.params; // O ID da nota a ser deletada vem pela URL

    // Executa a consulta de exclusão
    db.query(q, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao excluir a nota", error: err });
        }

        // Se a exclusão for bem-sucedida
        return res.status(200).json({ message: "Nota excluída com sucesso" });
    });
};
