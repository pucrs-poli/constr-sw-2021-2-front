const backendURL = 'http://localhost:3333'
const listarCadastrarTurma = '/turma'
const editarDeletarTurma = '/turma/'

export function putNewTurmaData (payload) {
    return fetch(
        `${backendURL}${listarCadastrarTurma}`,
        {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
}

export function putEditarTurmaData (payload, turmaID) {
    return fetch(
        `${backendURL}${editarDeletarTurma}${turmaID}`,
        {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
}

export function putDeleteTurmaData (payload, turmaID) {
    return fetch(
        `${backendURL}${editarDeletarTurma}${turmaID}`,
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
        `${backendURL}${listarCadastrarTurma}`
    )
}