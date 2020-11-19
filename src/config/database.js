const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USERS_SCHEMA = `
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL, 
    senha VARCHAR(255) NOT NULL
)
`;

const INSERT_USER_1 = 
`
INSERT INTO Users (
    name, 
    email,
    senha
    
) SELECT 'Gabriel Leite', 'gabriel@alura.com.br', '123' WHERE NOT EXISTS (SELECT * FROM Users WHERE email = 'gabriel@alura.com.br')
`;

const DOCTORS_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS Doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE
)
`;

const INSERT_DOCTOR_1 = 
`
INSERT INTO Doctors (
    name
) SELECT 'George Rappel' WHERE NOT EXISTS (SELECT * FROM Doctors WHERE name = 'George Rappel')
`;

const INSERT_DOCTOR_2 = 
`
INSERT INTO Doctors (
    name
) SELECT 'Marilia Mendonça' WHERE NOT EXISTS (SELECT * FROM doctors WHERE name = 'Marilia Mendonça')
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USERS_SCHEMA);
    db.run(INSERT_USER_1);
    db.run(DOCTORS_SCHEMA);
    db.run(INSERT_DOCTOR_1);
    db.run(INSERT_DOCTOR_2);

    db.each("SELECT * FROM Users", (err, user) => {
        console.log('User: ');
        console.log(user);
    });
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('db closed!');
        process.exit(0);
    })
);

module.exports = db;