export default class Aluno {
    constructor(id, name = '', description = '' , email = 'aa@gmail.com') {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
