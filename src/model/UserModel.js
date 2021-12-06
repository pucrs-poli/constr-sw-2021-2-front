import { NoMealsOutlined } from "@mui/icons-material";

export default class UserModel {
    constructor(email = '', login = '', nome = '', papeis = [''], matricula = '', senha = '') {
        this.email = email;
        this.login = login;
        this.nome = nome;
        this.papeis = papeis;
        this.matricula = matricula;
        this.senha = senha;
    }
}