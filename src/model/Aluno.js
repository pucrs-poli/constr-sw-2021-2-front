export default class Aluno {
    constructor(id, name = '', email = '', phone = '', birthday = null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.birthday = birthday;
    }
}
