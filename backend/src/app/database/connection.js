import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '26042007',
    database: 'eCommerce',
});

connection.connect();

/** JSDOC
 * Execute SQL code with or without values
 * @param {*string} sql sql statement to be executed
 * @param {*string} values values ​​to be passed to sql
 * @param {*string} rejectionMessage message to be displayed
 * @returns object of the Promise
 */
export const consult = (sql, values = "", rejectionMessage) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, result) => {
            if (error) return reject(rejectionMessage);
            const row = JSON.parse(JSON.stringify(result));
            return resolve(row);
        });
    });
};

export default connection;
