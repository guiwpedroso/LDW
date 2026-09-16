import { useEffect, useState } from "react";

import {
    listarUsuarios,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario
} from "../api/api";

function Alunos() {
    const [usuarios, setUsuarios] = useState([]);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const [editandoId, setEditandoId] = useState(null);

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    // =========================
    // ATUALIZAR LISTA
    // =========================
    async function atualizarLista() {
        try {
            setCarregando(true);
            setErro("");

            const dados = await listarUsuarios();

            setUsuarios(dados);
        } catch (erro) {
            setErro("Não foi possível carregar os usuários.");
        } finally {
            setCarregando(false);
        }
    }

    // =========================
    // CARREGAR USUÁRIOS
    // =========================
    useEffect(() => {
        atualizarLista();
    }, []);

    // =========================
    // CADASTRAR / EDITAR
    // =========================
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setErro("");

            if (editandoId) {
                // EDITAR
                await atualizarUsuario(editandoId, {
                    nome,
                    email
                });

                setEditandoId(null);
            } else {
                // CADASTRAR
                await cadastrarUsuario({
                    nome,
                    email
                });
            }

            // Atualiza a lista depois da operação
            await atualizarLista();

            // Limpa o formulário
            setNome("");
            setEmail("");
        } catch (erro) {
            setErro("Não foi possível salvar o usuário.");
        }
    }

    // =========================
    // PREPARAR EDIÇÃO
    // =========================
    function handleEditar(usuario) {
        setEditandoId(usuario.id);
        setNome(usuario.nome);
        setEmail(usuario.email);
    }

    // =========================
    // EXCLUIR
    // =========================
    async function handleExcluir(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este aluno?"
        );

        if (!confirmar) {
            return;
        }

        try {
            setErro("");

            await excluirUsuario(id);

            await atualizarLista();
        } catch (erro) {
            setErro("Não foi possível excluir o usuário.");
        }
    }

    // =========================
    // CANCELAR EDIÇÃO
    // =========================
    function cancelarEdicao() {
        setEditandoId(null);
        setNome("");
        setEmail("");
    }

    return (
        <main className="container">

            {/* =========================
                FORMULÁRIO
            ========================= */}

            <div className="cadastro">

                <h2>
                    {editandoId
                        ? "✏️ Editar Aluno"
                        : "👨‍🎓 Cadastro de Aluno"}
                </h2>

                <p>
                    {editandoId
                        ? "Altere os dados do aluno."
                        : "Preencha os dados para cadastrar um novo aluno."}
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="campo">
                        <label>Nome</label>

                        <input
                            type="text"
                            placeholder="Digite o nome"
                            value={nome}
                            onChange={(event) =>
                                setNome(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>E-mail</label>

                        <input
                            type="email"
                            placeholder="Digite o e-mail"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    <button type="submit">
                        {editandoId
                            ? "Salvar alterações"
                            : "Cadastrar aluno"}
                    </button>

                    {editandoId && (
                        <button
                            type="button"
                            onClick={cancelarEdicao}
                        >
                            Cancelar edição
                        </button>
                    )}

                </form>
            </div>


            {/* =========================
                LISTA
            ========================= */}

            <div className="lista">

                <h2>📋 Alunos cadastrados</h2>

                {/* LOADING */}

                {carregando && (
                    <p className="vazio">
                        Carregando...
                    </p>
                )}

                {/* ERRO */}

                {erro && (
                    <p className="erro">
                        {erro}
                    </p>
                )}

                {/* LISTA VAZIA */}

                {!carregando && !erro && usuarios.length === 0 && (
                    <p className="vazio">
                        Nenhum aluno cadastrado ainda.
                    </p>
                )}

                {/* USUÁRIOS */}

                {!carregando &&
                    usuarios.length > 0 &&
                    usuarios.map((usuario) => (

                        <div
                            className="usuario"
                            key={usuario.id}
                        >

                            <div className="avatar">
                                {usuario.nome
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="informacoes">

                                <strong>
                                    {usuario.nome}
                                </strong>

                                <span>
                                    {usuario.email}
                                </span>

                                <div className="acoes">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleEditar(usuario)
                                        }
                                    >
                                        ✏️ Editar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleExcluir(
                                                usuario.id
                                            )
                                        }
                                    >
                                        🗑️ Excluir
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

            </div>

        </main>
    );
}

export default Alunos;
