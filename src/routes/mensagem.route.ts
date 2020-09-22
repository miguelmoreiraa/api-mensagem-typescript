import { Router } from "express";
import mensagemControllers from "../controllers/mensagem.controllers";
import authMiddleware from "../middlewares/auth.middleware";

const mensagemRoute = Router();

mensagemRoute.post(
    '/:id',
    authMiddleware.autorizarUsuarioByParams,
    authMiddleware.autorizarUsuarioByToken,         // EndPoint para envio de mensagem
    mensagemControllers.enviar
);


mensagemRoute.get(
    '/:id',
    authMiddleware.autorizarUsuarioByParams,
    authMiddleware.autorizarUsuarioByToken,         // EndPoint para listagem dos usuários 
    mensagemControllers.listar
);


export default mensagemRoute;