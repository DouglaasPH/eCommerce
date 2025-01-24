import jwt from 'jsonwebtoken';


// Chave secreta
const secretKey = process.env.JWT_SECRET || 'tWOhy77qJST+VfLxe/85bpPIUwI2xB+ke8fjZ5QYfwyLiICiAMKLKB/iWfxCuGdjJUrUTL26HpwA1/GQWwMbgg==';

/**
 * Gera um token JWT
 * @param {Object} payload - Dados a serem armazenados no token.
 * @param {string} expiresIn - Tempo de expiração (ex.: '1h', '7d').
 * @returns {string} = Token JWT gerado.
 */

function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, secretKey, { expiresIn });
};

/**
 * Verifica e decodifica um token JWT
 * @param {string} token - Token JWT recebido.
 * @returns {Object} - Dados decodificados do token.
 * @throws {Error} - Erro caso o token seja inválido ou expirado.
 */

function verifyToken(token) {
    return jwt.verify(token, secretKey);
};

export { generateToken, verifyToken };