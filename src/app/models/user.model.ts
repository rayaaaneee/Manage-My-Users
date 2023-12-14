export class User {

    public id: number;
    public name: string;
    public email: string;
    public occupation: string;

    constructor(id: number, name: string, email: string, occupation: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.occupation = occupation;
    }
}
