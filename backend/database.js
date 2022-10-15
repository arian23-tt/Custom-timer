const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "timer",
    password: ""
});






// тестирование подключения
connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

let queryString = 'SELECT FirstName FROM user WHERE id_user=1';
// let queryInsert = `INSERT user(FirstName, LastName, Login, Password) VALUES ('Ара', 'Джамшут', 'typ99', 'arianLOH')`;

// connection.query(queryInsert, (err, results, fields) => {
//     console.log(err);
//     console.log(results);
//     // console.log(fields);
// });

connection.query(queryString, (err, results, fields) => {
    console.log(err);
    console.log(results);
    // console.log(fields);
});

// закрытие подключения
connection.end(function (err) {
    if (err) {
        return console.log("Ошибка: " + err.message);
    }
    console.log("Подключение закрыто");
});
