"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const autenticacao_1 = require("../middlewares/autenticacao");
const userRoutes = express_1.default.Router();
exports.userRoutes = userRoutes;
// Defina as rotas para usuários
userRoutes.post('/', usuarios_controller_1.createUserController);
userRoutes.get('/:id', autenticacao_1.autenticar, usuarios_controller_1.getUserByIdController);
userRoutes.put('/:id', autenticacao_1.autenticar, usuarios_controller_1.updateUserController);
userRoutes.delete('/:id', autenticacao_1.autenticar, usuarios_controller_1.deleteUserController);
userRoutes.post('/login', usuarios_controller_1.loginUserController); // Rota de login
