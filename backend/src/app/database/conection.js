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

export const checkLogin = (sql, valores = "", mensagemReject) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, valores, (error, result) => {
            if (error) return reject(mensagemReject);
            const row = JSON.parse(JSON.stringify(result));            
            if (row.length > 0) {
                const token = generateToken({
                    id: row[0].id,
                    username: row[0].name,
                    email: row[0].email,
                    phoneNumber: row[0].phone_number,
                });
                return resolve({ token });
            } else return resolve({ token: "undefined" });
        });
    });
};

export default conexao;
