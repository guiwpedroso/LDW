const cursoModel = require("../models/cursoModels");

async function listarCursos(req, res) {
    try {
        const cursos = await cursoModel.listarCursos();
        res.json(cursos);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao listar cursos."
        });
    }
}

async function buscarCurso(req, res) {
    try {
        const curso = await cursoModel.buscarCurso(
            req.params.id
        );

        if (!curso) {
            return res.status(404).json({
                erro: "Curso não encontrado."
            });
        }

        res.json(curso);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao buscar curso."
        });
    }
}

async function cadastrarCurso(req, res) {
    try {
        const { nome, descricao, carga_horaria } = req.body;

        if (!nome) {
            return res.status(400).json({
                erro: "Nome do curso é obrigatório."
            });
        }

        const curso = await cursoModel.adicionarCurso(
            nome,
            descricao,
            carga_horaria
        );

        res.status(201).json(curso);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar curso."
        });
    }
}

async function atualizarCurso(req, res) {
    try {
        const { nome, descricao, carga_horaria } = req.body;

        if (!nome) {
            return res.status(400).json({
                erro: "Nome do curso é obrigatório."
            });
        }

        const curso = await cursoModel.atualizarCurso(
            req.params.id,
            nome,
            descricao,
            carga_horaria
        );

        if (!curso) {
            return res.status(404).json({
                erro: "Curso não encontrado."
            });
        }

        res.json(curso);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao atualizar curso."
        });
    }
}

async function excluirCurso(req, res) {
    try {
        const excluido = await cursoModel.excluirCurso(
            req.params.id
        );

        if (!excluido) {
            return res.status(404).json({
                erro: "Curso não encontrado."
            });
        }

        res.json({
            mensagem: "Curso excluído com sucesso."
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao excluir curso."
        });
    }
}

module.exports = {
    listarCursos,
    buscarCurso,
    cadastrarCurso,
    atualizarCurso,
    excluirCurso
};
