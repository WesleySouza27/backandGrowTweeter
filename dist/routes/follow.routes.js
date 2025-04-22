"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRoutes = void 0;
const express_1 = __importDefault(require("express"));
const follow_controller_1 = require("../controllers/follow.controller");
const autenticacao_1 = require("../middlewares/autenticacao"); // Importe o middleware de autenticação
const followRoutes = express_1.default.Router();
exports.followRoutes = followRoutes;
// Rotas para seguidores (follows)
followRoutes.get('/:id', follow_controller_1.obterSeguidorPorIdController);
followRoutes.post('/', autenticacao_1.autenticar, follow_controller_1.criarSeguidorController); // Apenas usuários autenticados podem seguir outros
followRoutes.delete('/:id', autenticacao_1.autenticar, follow_controller_1.deletarSeguidorController); // Apenas usuários autenticados podem deixar de seguir
followRoutes.get('/seguidores/:usuarioId', follow_controller_1.obterSeguidoresDoUsuarioController);
followRoutes.get('/seguindo/:usuarioId', follow_controller_1.obterSeguindoDoUsuarioController);
