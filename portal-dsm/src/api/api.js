const API_URL = "http://localhost:3000";

// ========================================
// USUÁRIOS
// ========================================

export async function listarUsuarios() {
    const resposta = await fetch(`${API_URL}/usuarios`);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar usuários.");
    }

    return await resposta.json();
}

export async function cadastrarUsuario(usuario) {
    const resposta = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao cadastrar usuário.");
    }

    return await resposta.json();
}

export async function atualizarUsuario(id, usuario) {
    const resposta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao atualizar usuário.");
    }

    return await resposta.json();
}

export async function excluirUsuario(id) {
    const resposta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE"
    });

    if (!resposta.ok) {
        throw new Error("Erro ao excluir usuário.");
    }

    return await resposta.json();
}


// ========================================
// CURSOS
// ========================================

export async function listarCursos() {
    const resposta = await fetch(`${API_URL}/cursos`);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar cursos.");
    }

    return await resposta.json();
}

export async function cadastrarCurso(curso) {
    const resposta = await fetch(`${API_URL}/cursos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(curso)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao cadastrar curso.");
    }

    return await resposta.json();
}

export async function atualizarCurso(id, curso) {
    const resposta = await fetch(`${API_URL}/cursos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(curso)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao atualizar curso.");
    }

    return await resposta.json();
}

export async function excluirCurso(id) {
    const resposta = await fetch(`${API_URL}/cursos/${id}`, {
        method: "DELETE"
    });

    if (!resposta.ok) {
        throw new Error("Erro ao excluir curso.");
    }

    return await resposta.json();
}
