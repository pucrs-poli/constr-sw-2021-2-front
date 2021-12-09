export default class Disciplina {
    constructor(id, titulo = '', validade = '', descricao = '', ementa = '', codigo = '', credito = '', cargahr = '') {
        this.id = id;
        this.titulo = titulo;
        this.validade = validade;
        this.descricao = descricao;
        this.ementa = ementa;
        this.codigo = codigo;
        this.credito = credito;
        this.cargahr = cargahr;
    }
}