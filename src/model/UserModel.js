export default class UserModel {
    constructor(id = '', email = '', login = '', nome = '', papeis = [], matricula = '', senha = '') {
        this.id = id
        this.email = email;
        this.login = login;
        this.nome = nome;
        this.papeis = papeis;
        this.matricula = matricula;
        this.senha = senha;
    }
}