export interface UserInterface {
  name: string,
  email: string,
  occupation: string,
  adress?: string,
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
    public adress?: string;
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

    setOptionalInformations(adress: string, city: string, bio: string, phone: string, gender: string): this {
      this.adress = adress;
      this.city = city;
      this.bio = bio;
      this.phone = phone;
      this.gender = gender;
      return this;
    }

    getGenderValue(): string {
      switch(this.gender) {
        case "male":
          return "M";
        case "female":
        default:
          return "F";
      }
    }

    toJson(): UserInterface {
      return {
        name: this.name,
        email: this.email,
        occupation: this.occupation,
        adress: this.adress,
        city: this.city,
        bio: this.bio,
        phone: this.phone,
        gender: this.gender
      }
    }
}
