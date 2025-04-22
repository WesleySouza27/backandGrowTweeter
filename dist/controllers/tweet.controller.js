"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarTweetController = criarTweetController;
exports.obterTweetPorIdController = obterTweetPorIdController;
exports.atualizarTweetController = atualizarTweetController;
exports.deletarTweetController = deletarTweetController;
exports.obterTodosTweetsController = obterTodosTweetsController;
const tweet_service_1 = require("../services/tweet.service");
const api_response_1 = require("../utils/api-response");
// // Controller para criar um novo tweet
// async function criarTweetController(req: Request, res: Response, next: NextFunction) {
//   try {
//     const dados: Omit<Prisma.TweetCreateInput, 'id'> = req.body;
//     const novoTweet = await criarTweet(dados);
//     ApiResponse.success(res, 'Tweet criado com sucesso', novoTweet, 201);
//   } catch (erro: any) {
//     next(erro);
//   }
// }
// Controller para criar um novo tweet ou reply
async function criarTweetController(req, res, next) {
    try {
        const { descricao, tipo } = req.body;
        const usuarioId = req.usuario?.id; // Obtém o ID do usuário autenticado do middleware
        const parentId = req.params.tweetId; // Obtém o ID do tweet original, se for um reply
        if (!descricao) {
            api_response_1.ApiResponse.error(res, 'A descrição é obrigatória', null, 400);
            return;
        }
        if (!usuarioId) {
            api_response_1.ApiResponse.error(res, 'Usuário não autenticado', null, 401);
            return;
        }
        let novoTweet;
        if (parentId) {
            // Cria um reply
            novoTweet = await (0, tweet_service_1.criarReply)(descricao, usuarioId, parentId);
        }
        else {
            // Cria um tweet normal
            novoTweet = await (0, tweet_service_1.criarTweet)({
                descricao,
                tipo: tipo || 'tweet', // Define o tipo como "tweet" por padrão
                usuario: { connect: { id: usuarioId } },
            });
        }
        api_response_1.ApiResponse.success(res, 'Tweet criado com sucesso', novoTweet, 201);
    }
    catch (erro) {
        next(erro);
    }
}
// Controller para obter um tweet pelo ID
async function obterTweetPorIdController(req, res, next) {
    try {
        const id = req.params.id;
        const tweet = await (0, tweet_service_1.obterTweetPorId)(id);
        if (!tweet) {
            api_response_1.ApiResponse.error(res, 'Tweet não encontrado', null, 404);
            return;
        }
        api_response_1.ApiResponse.success(res, 'Tweet encontrado', tweet);
    }
    catch (erro) {
        next(erro);
    }
}
// Controller para atualizar um tweet
async function atualizarTweetController(req, res, next) {
    try {
        const id = req.params.id;
        const dados = req.body;
        const tweetAtualizado = await (0, tweet_service_1.atualizarTweet)(id, dados);
        api_response_1.ApiResponse.success(res, 'Tweet atualizado com sucesso', tweetAtualizado);
    }
    catch (erro) {
        next(erro);
    }
}
// Controller para deletar um tweet
async function deletarTweetController(req, res, next) {
    try {
        const id = req.params.id;
        await (0, tweet_service_1.deletarTweet)(id);
        api_response_1.ApiResponse.success(res, 'Tweet deletado com sucesso');
    }
    catch (erro) {
        next(erro);
    }
}
async function obterTodosTweetsController(req, res, next) {
    try {
        const tweets = await (0, tweet_service_1.obterTodosTweets)();
        api_response_1.ApiResponse.success(res, 'Tweets encontrados', tweets);
    }
    catch (error) {
        next(error);
    }
}
