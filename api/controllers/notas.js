import { db } from "../db.js";


export const getNotas = (_, res) => {

    // A consulta SQL para buscar os dados das notas
    const q = "SELECT * FROM notas";

    db.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });

}

export const getNota = (req, res) => {
    
    const search = req.params.search;

    // Determina se o parâmetro é um ID (número) ou um título (string)
    const isNumeric = !isNaN(search);

    // Monta a consulta SQL baseada no tipo do parâmetro
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


export const postNota = (req, res) => {

    // A consulta SQL para criar nota
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

export const updateNota = (req, res) => {
    
    // A consulta SQL para atualizar os dados da nota
    const q = `UPDATE notas SET titulo = ?, conteudo = ?, cor_fundo = ?, etiqueta = ?, imagem = ?, 
        favorito = ? WHERE id = ?;`;

    const { id } = req.params; // O ID da nota a ser atualizada vem pela URL
    const { titulo, conteudo, cor_fundo, etiqueta, imagem, favorito } = req.body; // Dados que vamos atualizar


    // Executa a query no banco de dados
    db.query(q, [titulo, conteudo, cor_fundo, etiqueta, imagem, favorito, id], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao atualizar a nota", error: err });
        }

        // Se a atualização for bem-sucedida
        return res.status(200).json({ message: "Nota atualizada com sucesso", data });
    });
};

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

