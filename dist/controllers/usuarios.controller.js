"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = createUserController;
exports.getUserByIdController = getUserByIdController;
exports.updateUserController = updateUserController;
exports.deleteUserController = deleteUserController;
exports.loginUserController = loginUserController;
const dotenv_1 = __importDefault(require("dotenv"));
const usuarios_service_1 = require("../services/usuarios.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_response_1 = require("../utils/api-response");
dotenv_1.default.config();
const secret = process.env.JWT_SECRET || 'chave_secreta';
if (!secret) {
    throw new Error('JWT_SECRET não está definido nas variáveis de ambiente');
}
// Função para gerar o token JWT
function generateToken(usuario) {
    return jsonwebtoken_1.default.sign({ email: usuario.email }, secret, { expiresIn: '1h' });
}
// Controller para criar um novo usuário
async function createUserController(req, res, next) {
    try {
        const { nome, email, senha, avatar } = req.body;
        if (!nome || !email || !senha) {
            api_response_1.ApiResponse.error(res, 'Nome, email e senha são obrigatórios', null, 400);
            return;
        }
        const usuarioCriado = await (0, usuarios_service_1.createUser)({ nome, email, senha, avatar });
        api_response_1.ApiResponse.success(res, 'Usuário criado com sucesso', usuarioCriado, 201);
    }
    catch (erro) {
        next(erro);
    }
}
// Controller para obter um usuário pelo ID
async function getUserByIdController(req, res, next) {
    try {
        const usuarioId = req.params.id;
        const usuario = await (0, usuarios_service_1.getUserById)(usuarioId);
        if (!usuario) {
            api_response_1.ApiResponse.error(res, 'Utilizador não encontrado', null, 404);
            return;
        }
        api_response_1.ApiResponse.success(res, 'Utilizador encontrado', usuario);
    }
    catch (error) {
        next(error);
    }
}
// Controller para atualizar um usuário
async function updateUserController(req, res, next) {
    try {
        const { id } = req.params;
        const { nome, email, avatar } = req.body;
        const usuarioAtualizado = await (0, usuarios_service_1.updateUser)(id, { nome, email, avatar });
        api_response_1.ApiResponse.success(res, 'Usuário atualizado com sucesso', usuarioAtualizado, 200);
    }
    catch (erro) {
        next(erro);
    }
}
// Controller para deletar um usuário
async function deleteUserController(req, res, next) {
    try {
        const usuarioId = req.params.id;
        await (0, usuarios_service_1.deleteUser)(usuarioId);
        api_response_1.ApiResponse.success(res, 'Utilizador eliminado com sucesso');
    }
    catch (error) {
        next(error);
    }
}
// Controller para login
async function loginUserController(req, res, next) {
    try {
        const { email, password } = req.body;
        // Valida se os campos foram fornecidos
        if (!email || !password) {
            api_response_1.ApiResponse.error(res, 'Email e senha são obrigatórios', null, 400);
            return;
        }
        // Encontra o usuário por email
        const usuario = await (0, usuarios_service_1.findUserByEmail)(email);
        if (!usuario) {
            api_response_1.ApiResponse.error(res, 'usuario não encontrado', null, 401);
            return;
        }
        // Verifica a senha
        const passwordMatch = await (0, usuarios_service_1.comparePassword)(password, usuario.senha);
        if (!passwordMatch) {
            api_response_1.ApiResponse.error(res, 'Senha ou e-mail incorreta', null, 401);
            return;
        }
        // Gera o token JWT
        const token = generateToken(usuario);
        // Retorna o token para o cliente
        api_response_1.ApiResponse.success(res, 'Login realizado com sucesso', {
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                avatar: usuario.avatar || null
            }
        });
    }
    catch (erro) {
        next(erro);
    }
}
