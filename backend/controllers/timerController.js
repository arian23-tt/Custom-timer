// const timers = require("./data.js");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "timer",
    password: ""
});
 



class Controller {
    async getTimers() {
        // return new Promise((resolve, _) => resolve(data));
        connection.connect(function (err) {
            if (err) {
                return console.error("Ошибка: " + err.message);
            }
            else {
                console.log("Подключение к серверу MySQL успешно установлено");
            }
        });
        
        let queryString = 'SELECT * FROM user';
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
        
    }

    async getTimer(id) {
    
        connection.connect(function (err) {
            if (err) {
                return console.error("Ошибка: " + err.message);
            }
            else {
                console.log("Подключение к серверу MySQL успешно установлено");
            }
        })

        let queryString = `SELECT FirstName, LastName, Login FROM user Where  id_user = ${id}`;
        connection.query(queryString, (err, results, fields) => {
            console.log(err);
            console.log(results);
            
        });
        
        // закрытие подключения
        connection.end(function (err) {
            if (err) {
                return console.log("Ошибка: " + err.message);
            }
            console.log("Подключение закрыто");
        });
        
    }

    async createTimer(timer) {
        let queryInsert = `INSERT User(FirstName, LastName, Login, Password) VALUES `;

connection.query(queryInsert, (err, results, fields) => {
    console.log(err);
    console.log(results);
    // console.log(fields);
});
    }

    async updateTimer(id) {
        return new Promise((resolve, reject) => {
            let timer = data.find((timer) => timer.id === parseInt(id));
            if (!timer) {
                reject(`No timer with id ${id} found`);
            }
            timer["completed"] = true;
            resolve(timer);
        });
    }

    async deleteTimer(id) {
        return new Promise((resolve, reject) => {
            let timer = data.find((timer) => timer.id === parseInt(id));
            if (!timer) {
                reject(`No timer with id ${id} found`);
            }
            resolve(`Timer deleted successfully`);
        });
    }
}
module.exports = Controller;