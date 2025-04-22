"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticar = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarios_service_1 = require("../services/usuarios.service");
const api_response_1 = require("../utils/api-response");
const client_1 = require("../generated/prisma/client");
const prisma = new client_1.PrismaClient();
// Chave secreta para assinar os tokens JWT
const secret = process.env.JWT_SECRET || 'chave_secreta';
/**
 * Middleware para autenticar as requisições.
 * Verifica se o token JWT é válido e, se for, define o usuário autenticado no objeto de requisição.
 */
const autenticar = async (req, res, next) => {
    // Obtém o token do header da requisição
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // Verifica se o token foi fornecido
    if (!token) {
        api_response_1.ApiResponse.error(res, 'Token de autenticação não fornecido', null, 401);
        return;
    }
    try {
        // Verifica se o token é válido
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Busca o usuário no banco de dados pelo email extraído do token
        const usuario = await (0, usuarios_service_1.findUserByEmail)(decoded.email);
        // Verifica se o usuário existe
        if (!usuario) {
            api_response_1.ApiResponse.error(res, 'Usuário não encontrado', null, 401);
            return;
        }
        // Define o usuário autenticado no objeto de requisição para uso posterior
        req.usuario = usuario;
        next();
    }
    catch (erro) {
        // Se o token for inválido ou expirado, retorna um erro de autenticação
        api_response_1.ApiResponse.error(res, 'Token de autenticação inválido', null, 401);
    }
};
exports.autenticar = autenticar;
