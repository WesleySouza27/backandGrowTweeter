"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarios_routes_1 = require("./routes/usuarios.routes");
const tweets_routes_1 = require("./routes/tweets.routes");
const likes_routes_1 = require("./routes/likes.routes");
const follow_routes_1 = require("./routes/follow.routes");
const error_handler_1 = require("./middlewares/error-handler"); // Importe o middleware de erro
const api_response_1 = require("./utils/api-response");
const app = (0, express_1.default)();
exports.app = app;
// Middlewares globais
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Rotas da aplicação
app.use('/usuarios', usuarios_routes_1.userRoutes);
app.use('/tweets', tweets_routes_1.tweetRoutes);
app.use('/likes', likes_routes_1.likeRoutes);
app.use('/follows', follow_routes_1.followRoutes);
app.use(error_handler_1.errorHandler); // Use o middleware de tratamento de erros
// Middleware de exemplo para lidar com rotas não encontradas (opcional)
app.use((req, res) => {
    api_response_1.ApiResponse.error(res, 'Rota não encontrada', null, 404);
});
