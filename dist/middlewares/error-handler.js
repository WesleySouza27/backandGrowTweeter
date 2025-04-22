"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const api_response_1 = require("../utils/api-response");
/**
 * Middleware para tratar erros de forma global.
 * Captura erros que ocorrem durante a execução das rotas e os formata em uma resposta JSON consistente.
 */
function errorHandler(err, req, res, next) {
    console.error(err); // Registra o erro no console para depuração
    // Verifica o tipo do erro e define o código de status HTTP e a mensagem apropriados
    let codigo = 500;
    let mensagem = 'Erro interno do servidor';
    if (err instanceof Error) { // Aqui você pode adicionar verificações para tipos de erros específicos
        mensagem = err.message;
        if (mensagem === 'Token de autenticação inválido') {
            codigo = 401;
        }
        else if (mensagem === 'Usuário não encontrado') {
            codigo = 404;
        }
        else if (mensagem === 'Email já cadastrado') {
            codigo = 409;
        }
    }
    // Formata a resposta de erro usando a classe ApiResponse
    api_response_1.ApiResponse.error(res, mensagem, null, codigo);
}
