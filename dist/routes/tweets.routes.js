"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetRoutes = void 0;
const express_1 = __importDefault(require("express"));
const tweet_controller_1 = require("../controllers/tweet.controller");
const autenticacao_1 = require("../middlewares/autenticacao"); // Importe o middleware de autenticação
const tweetRoutes = express_1.default.Router();
exports.tweetRoutes = tweetRoutes;
// Rotas para tweets
tweetRoutes.get('/', tweet_controller_1.obterTodosTweetsController);
tweetRoutes.get('/:id', tweet_controller_1.obterTweetPorIdController);
tweetRoutes.post('/', autenticacao_1.autenticar, tweet_controller_1.criarTweetController); // Apenas usuários autenticados podem criar tweets
tweetRoutes.put('/:id', autenticacao_1.autenticar, tweet_controller_1.atualizarTweetController); // Apenas usuários autenticados podem atualizar tweets
tweetRoutes.delete('/:id', autenticacao_1.autenticar, tweet_controller_1.deletarTweetController); // Apenas usuários autenticados podem deletar tweets
tweetRoutes.post('/:tweetId/reply', autenticacao_1.autenticar, tweet_controller_1.criarTweetController); // Apenas usuários autenticados podem criar replies
