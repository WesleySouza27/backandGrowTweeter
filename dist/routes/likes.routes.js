"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const like_controller_1 = require("../controllers/like.controller");
const autenticacao_1 = require("../middlewares/autenticacao"); // Importe o middleware de autenticação
const likeRoutes = express_1.default.Router();
exports.likeRoutes = likeRoutes;
// Rotas para likes
likeRoutes.get('/:id', like_controller_1.obterLikePorIdController);
likeRoutes.post('/', autenticacao_1.autenticar, like_controller_1.criarLikeController); // Apenas usuários autenticados podem dar like
likeRoutes.delete('/:id', autenticacao_1.autenticar, like_controller_1.deletarLikeController); // Apenas usuários autenticados podem deletar likes
