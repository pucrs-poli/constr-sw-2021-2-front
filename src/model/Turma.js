export default class Turma {
    constructor(id, titulo = '', ano = '', semestre = '', horario = '', disciplina = '') {
        this.id = id;
        this.titulo = titulo;
        this.ano = ano;
        this.semestre = semestre;
        this.horario = horario;
        this.disciplina = disciplina;
    }
}