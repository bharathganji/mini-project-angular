export class user {
  uid!: number;
  username!: string;
  password!: string;
  email!: string;

  constructor(uid: number, username: string, password: string, email: string) {
    this.uid = uid;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
