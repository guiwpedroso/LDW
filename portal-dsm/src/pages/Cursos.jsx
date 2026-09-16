import { useEffect, useState } from "react";

import {
    listarCursos,
    cadastrarCurso,
    atualizarCurso,
    excluirCurso
} from "../api/api";

function Cursos() {
    const [cursos, setCursos] = useState([]);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [cargaHoraria, setCargaHoraria] = useState("");

    const [editandoId, setEditandoId] = useState(null);

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    // =========================
    // LISTAR CURSOS
    // =========================

    async function atualizarLista() {
        try {
            setCarregando(true);
            setErro("");

            const dados = await listarCursos();

            setCursos(dados);
        } catch (erro) {
            console.error(erro);
            setErro("Não foi possível carregar os cursos.");
        } finally {
            setCarregando(false);
        }
    }

    // =========================
    // CARREGAR AO ABRIR A PÁGINA
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

            const curso = {
                nome,
                descricao,
                carga_horaria: Number(cargaHoraria)
            };

            if (editandoId) {
                await atualizarCurso(editandoId, curso);

                setEditandoId(null);
            } else {
                await cadastrarCurso(curso);
            }

            await atualizarLista();

            limparFormulario();

        } catch (erro) {
            console.error(erro);
            setErro("Não foi possível salvar o curso.");
        }
    }

    // =========================
    // EDITAR
    // =========================

    function handleEditar(curso) {
        setEditandoId(curso.id);

        setNome(curso.nome);
        setDescricao(curso.descricao || "");
        setCargaHoraria(curso.carga_horaria || "");
    }

    // =========================
    // EXCLUIR
    // =========================

    async function handleExcluir(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este curso?"
        );

        if (!confirmar) {
            return;
        }

        try {
            setErro("");

            await excluirCurso(id);

            await atualizarLista();

        } catch (erro) {
            console.error(erro);
            setErro("Não foi possível excluir o curso.");
        }
    }

    // =========================
    // LIMPAR FORMULÁRIO
    // =========================

    function limparFormulario() {
        setNome("");
        setDescricao("");
        setCargaHoraria("");
        setEditandoId(null);
    }

    return (
        <main className="container">

            {/* =========================
                FORMULÁRIO
            ========================= */}

            <div className="cadastro">

                <h2>
                    {editandoId
                        ? "✏️ Editar Curso"
                        : "📚 Cadastro de Curso"}
                </h2>

                <p>
                    {editandoId
                        ? "Altere os dados do curso."
                        : "Preencha os dados para cadastrar um novo curso."}
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="campo">
                        <label>Nome do curso</label>

                        <input
                            type="text"
                            placeholder="Digite o nome do curso"
                            value={nome}
                            onChange={(event) =>
                                setNome(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Descrição</label>

                        <input
                            type="text"
                            placeholder="Digite a descrição"
                            value={descricao}
                            onChange={(event) =>
                                setDescricao(event.target.value)
                            }
                        />
                    </div>

                    <div className="campo">
                        <label>Carga horária</label>

                        <input
                            type="number"
                            placeholder="Ex: 80"
                            value={cargaHoraria}
                            onChange={(event) =>
                                setCargaHoraria(event.target.value)
                            }
                            min="1"
                        />
                    </div>

                    <button type="submit">
                        {editandoId
                            ? "Salvar alterações"
                            : "Cadastrar curso"}
                    </button>

                    {editandoId && (
                        <button
                            type="button"
                            onClick={limparFormulario}
                        >
                            Cancelar edição
                        </button>
                    )}

                </form>
            </div>

            {/* =========================
                LISTA DE CURSOS
            ========================= */}

            <div className="lista">

                <h2>📚 Cursos cadastrados</h2>

                {carregando && (
                    <p className="vazio">
                        Carregando cursos...
                    </p>
                )}

                {erro && (
                    <p className="erro">
                        {erro}
                    </p>
                )}

                {!carregando &&
                    !erro &&
                    cursos.length === 0 && (
                        <p className="vazio">
                            Nenhum curso cadastrado ainda.
                        </p>
                    )}

                {!carregando &&
                    cursos.length > 0 &&
                    cursos.map((curso) => (

                        <div
                            className="usuario"
                            key={curso.id}
                        >

                            <div className="avatar">
                                📚
                            </div>

                            <div className="informacoes">

                                <strong>
                                    {curso.nome}
                                </strong>

                                <span>
                                    {curso.descricao}
                                </span>

                                <span>
                                    Carga horária:{" "}
                                    {curso.carga_horaria} horas
                                </span>

                                <div className="acoes">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleEditar(curso)
                                        }
                                    >
                                        ✏️ Editar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleExcluir(curso.id)
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

export default Cursos;
