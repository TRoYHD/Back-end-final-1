# PWA E-Commerce Website (Backend)

## Authors

- [@TRoYHD](https://github.com/TRoYHD)

## Instructions

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Environment variables](#environment-variables)
- [Installation](#installation)
- [Run Application](#run-application)

## Technologies

- Node.js
- TypeScript
- Express.js
- MySQL
- Sequelize (ORM)
- JSON Web Token

## Project Structure

```
.
└── PWA E-Commerce Website (Backend)/
    ├── src/
    │   ├── config/
    │   │   └── enviroment.ts
    │   ├── controllers/
    │   ├── db/
    │   │   ├── models/
    │   │   ├── queries/
    │   │   └── connection.ts
    │   ├── middlewares/
    │   ├── routers/
    │   ├── utils/
    │   │   ├── interfaces/
    │   │   └── validators/
    │   ├── app.ts
    │   └── index.ts
    ├── .env
    ├── .gitignore
    ├── .prettierrc
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── tsconfig.json
```

## Environment Variables

```
PORT = 8080
DB_DEV = ""
DB_PRODUCTION = ""
NODE_ENV = ""
```

## Installation

- Install dependancies `npm install`

## Run Application

- You can run app in development mode `npm run dev` or in production mode `npm start`
Database Schema:
![image](https://i.imgur.com/8hK2AhK.png)
