import jwt from 'jsonwebtoken';


// Secret key
const secretKey = process.env.JWT_SECRET || 'tWOhy77qJST+VfLxe/85bpPIUwI2xB+ke8fjZ5QYfwyLiICiAMKLKB/iWfxCuGdjJUrUTL26HpwA1/GQWwMbgg==';

/**
 * Generates a JWT token
 * @param {Object} payload - Data to be stored in the token.
 * @param {string} expiresIn - Expiration time (ex.: '1h', '7d').
 * @returns {string} = Generated JWT token.
 */

function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, secretKey, { expiresIn });
};

/**
 * verify and decodes a JWT token
 * @param {string} token - Received JWT token.
 * @returns {Object} - Decode JWT token datas.
 * @throws {Error} - Error if the o token is invalid or expired.
 */

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return error.name;
    }
};

export { generateToken, verifyToken };

/*
        const result = verifyToken(row.token);
        console.log(result)
*/