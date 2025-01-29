import mysql from 'mysql';
import { generateToken } from '../jwt/jwt.js';

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '26042007',
    database: 'eCommerce',
});

conexao.connect();

/** JSDOC
 * Executa um código sql com ou sem valores
 * @param {*string} sql instrução sql a ser executada
 * @param {*string | [selecao, id]} valores valores a serem passados para o sql
 * @param {*string} mensagemReject mensagem a ser exibida
 * @returns objeto da Promise
 */
export const consulta = (sql, valores = "", mensagemReject) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, valores, (error, result) => {
            if (error) return reject(mensagemReject);
            const row = JSON.parse(JSON.stringify(result));
            return resolve(row);
        });
    });
};

export const checkLogin = (sql, values = "", rejectionMessage) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, values, (error, result) => {
            if (error) return reject(rejectionMessage);
            const row = JSON.parse(JSON.stringify(result));            

            if (row.length > 0) {
                const token = generateToken({
                    id: row[0].id,
                    username: row[0].name,
                    email: row[0].email,
                    phoneNumber: row[0].phone_number,
                });
                
                return resolve({ token, login: true });
            } else return resolve({ token: "undefined", login: false });
        });
    });
};

export const createAccount = (sql, values = "", rejectionMessage) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, values, (error, result) => {
            if (error) return reject(rejectionMessage);
            const row = JSON.parse(JSON.stringify(result));

            if (row.affectedRows > 0) {
                return resolve({ message: 'Account created sucessfully', accountCreate: true });
            } else return resolve({ message: 'Account was not created', accountCreate: false });
        })
    })
}

export const validateEmail = (sql, values = "", rejectionMessage) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, values, (error, result) => {
            if (error) return reject(rejectionMessage);
            const row = JSON.parse(JSON.stringify(result));

            if (row.length > 0) {
                return resolve({ message: 'The email is already registered in the database', registeredEmail: true });
            } else return resolve({ message: 'The email is not registered in the database', registeredEmail: false });
        })
    })
}

export const updatePassword = (sql, values = "", rejectionMessage) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, values, (error, result) => {
            if (error) return reject(rejectionMessage);
            const row = JSON.parse(JSON.stringify(result));

            if (row.affectedRows > 0) {
                return resolve({ message: 'Password updated succesfully', updatedPassword: true });
            } else return resolve({ message: 'Unable to update password', updatedPassword: false });
        })
    })
}

export default conexao;
