const backendURL = 'http://localhost:3333'
const listarCadastrarDisciplina = '/disciplina'
const editarDeletarDisciplina = '/disciplina/'

export function putNewDisciplinaData (payload) {
    return fetch(
        `${backendURL}${listarCadastrarDisciplina}`,
        {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
}

export function putEditarDisciplinaData (payload, turmaID) {
    return fetch(
        `${backendURL}${editarDeletarDisciplina}${turmaID}`,
        {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
}

export function putDeleteDisciplinaData (payload, turmaID) {
    return fetch(
        `${backendURL}${editarDeletarDisciplina}${turmaID}`,
        {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
}

export function getAllData () {
    return fetch(
        `${backendURL}${listarCadastrarDisciplina}`
    )
}