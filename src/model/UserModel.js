export default class UserModel {
  constructor(
    email = "",
    login = "",
    name = "",
    roles = [""],
    reg = "",
    password = ""
  ) {
    this.email = email;
    this.login = login;
    this.name = name;
    this.roles = roles;
    this.reg = reg;
    this.password = password;
  }
}
