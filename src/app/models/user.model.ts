export interface UserInterface {
  id: number,
  name: string,
  email: string,
  occupation: string,
  streetAdress?: string,
  city?: string,
  bio?: string,
  phone?: string,
  gender?: string,
}

export class User {

    public id!: number;
    public name!: string;
    public email!: string;
    public occupation!: string;
    public streetAdress?: string;
    public city?: string;
    public bio?: string;
    public phone?: string;
    public gender?: string;

    constructor(id: number, name: string, email: string, occupation: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.occupation = occupation;
    }

    setOptionalInformations(streetAdress: string, city: string, bio: string, phone: string, gender: string): this {
      this.streetAdress = streetAdress;
      this.city = city;
      this.bio = bio;
      this.phone = phone;
      this.gender = gender;
      return this;
    }

    toJson(): UserInterface {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        occupation: this.occupation,
        streetAdress: this.streetAdress,
        city: this.city,
        bio: this.bio,
        phone: this.phone,
        gender: this.gender
      }
    }
}
