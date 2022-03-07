export class user {
  name!: string;
  password!: string;
  email!: string;

  constructor(password: string, name: string, email: string) {
    this.name = name;
    this.password = password;
    this.email = email;
  }
}
