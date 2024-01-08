# Manage My Users

<img src="./src/assets/img/icon.png" width="100" height="100" />

## Project

Manage My Users is a simple web application that allows you to manage users. It is built using _Angular_.

Backend is a simple call to a _fake API_ (Mockapi.io), this API allows you to
create, read, update and delete users.

Important to note that the **edition** and **creation** of users is **not functional** because not permitted on the API. The API permits to delete and read users. Create endpoint is funcional but it create a fake user, not with the entered values.

## Installation

To install the project, you need to have _NodeJS_ installed on your computer.

Then, you need to install _Angular CLI_ with the following command:

```bash
npm install -g @angular/cli
```

Then, you need to install the dependencies of the project with the following command:

```bash
npm install
```

## Usage

To run the project, you need to run the following command:

```bash
ng serve
```

You can login with identifiers :
- username : admin
- password : admin

Otherwise, you can register you. The registration isn't really working, accounts are saved in local memory, not in a database.

Then, you can access the project on the following URL: http://localhost:4200

## Production

You also can try the production version of **[Manage My Users](https://manage-my-users.vercel.app/)**

## License

Created by Rayane Merlin, December 2023
