import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import usuarioModel from "../models/usuario.model";
import { UsuarioInterface } from "../interfaces/usuario.interface";

class AuthMiddleware {

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public async autorizarUsuarioByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const token = req.query.token || req.headers['x-access-token'];

        if (!token) {
            return res.status(401).send({ message: 'Acesso Restrito!' });
        }

        try {
            const usuarioToken = jwt.verify(token, 'SECRET') as UsuarioInterface;
            const usuario = await usuarioModel.findById(usuarioToken._id);

            if (!usuario) {
                return res.status(400).send({ message: 'Usuário não existe no banco de dados' })
            }


            req.usuario = usuario;

            return next();

        } catch (error) {
            return res.status(401).send({ message: 'Token Inválido' })
        }

    }

     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
     public async autorizarUsuarioByParams(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
       
        try {
            const usuario = await usuarioModel.findById(req.params.id);

            if (!usuario) {
                return res.status(400).send({ message: 'Usuário não existe no banco de dados' })
            }

            req.usuarioChat = usuario;

            return next();

        } catch (error) {
            return res.status(401).send({ message: 'Usuário Inválido' })
        }

    }



}

export default new AuthMiddleware();