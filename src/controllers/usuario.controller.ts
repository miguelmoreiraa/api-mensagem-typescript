import { json, Request, Response } from "express";
import mensagemModel from "../models/mensagem.model";
import usuarioModel from "../models/usuario.model";
import mensagemService from "../services/mensagem.service";

class UsuarioController {

    public async cadastrar(req: Request, res: Response): Promise<Response> {
        const usuario = await usuarioModel.create(req.body); // com async e await e só executo o return pois tenho certeza que a variavel usuario ja foi feita, pois é uma promise
        const resposta = {
            message: 'Usuário cadastrado com sucesso!',
            _id: usuario._id,
            nome: usuario.nome
            // todos as propriedas que colocar na usuario interface, eu consigo usar aqui
        }
        return res.json(resposta);
    }

    public async autenticar(req: Request, res: Response): Promise<Response> {
        const { nome, senha } = req.body;

        const usuario = await usuarioModel.findOne({ nome });
        if (!usuario) {
            return res.status(400).send({ message: 'Usuário não encontrado!' });
        }

        const senhaValida = await usuario.compararSenhas(senha);
        if (!senhaValida) {
            return res.status(400).send({ message: 'Senha incorreta!' });
        }

        return res.json({
            usuario,
            token: usuario.gerarToken()
        });

    }

    public getById(req: Request, res: Response): Response {
        return res.json(req.usuarioChat);
    }


    public async listar(req: Request, res: Response): Promise<Response> {
        const idUsuarioLogado = req.usuario._id; // nessa const estou buscando eu mesmo.

        const usuarios = await usuarioModel.find({ _id: { $ne: idUsuarioLogado } });


        // esse array é um array de Promisse
        const usuarioMensagem = await Promise.all(usuarios.map(usuario => {
            // com essa Promisse pra cada usuário que estou interando estou retornando um array dessas mensagens
            return mensagemModel.buscaChat(idUsuarioLogado, usuario._id)
                .sort('-createdAt') // ordenando por data decrescente
                .limit(1) // limitando pra pegar sempre a primeira mensagem
                // transformo o objeto para os dados que quero ver, fazendo isso pra cada um dos usuarios
                .map(mensagens => mensagemService.getResultadoMensagemUsuario(mensagens, usuario))
        }));

        const mensagensOrdenadas = mensagemService.retornaMensagensOrdenadas(usuarioMensagem)


        return res.json(mensagensOrdenadas);
    }




}

export default new UsuarioController();