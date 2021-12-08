export default class Class {
    constructor({ _id, numTurma = '', disciplina = '', professor = '', reserva = null, date = new Date().getTime() }) {
        this.id = _id;
        this.date = date;
        this.numTurma = numTurma;
        this.disciplina = disciplina;
        this.professor = professor;
        this.reserva = reserva;
    }
}