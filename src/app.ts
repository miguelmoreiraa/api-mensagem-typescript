import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usuarioRoute from './routes/usuario.route';
import mensagemRoute from './routes/mensagem.route';

export class App {

    private express: express.Application; // como ele não entende o express no TS, temos que tipar essa variavél
    private porta = 9000;

    constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private middlewares(): void {
        this.express.use(express.json()); // requisições em JSON
        this.express.use(cors()); // Cors para eu o angular acesse a API
    }

    private listen(): void {
        this.express.listen(this.porta, () => {
            console.log('Servidor iniciado na porta ' + this.porta);
        });
    }

    private database(): void {
        mongoose.connect('mongodb+srv://miguel:23052001@cluster0.l7mv4.mongodb.net/miguel?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    }

    private routes(): void {
        this.express.use('/usuarios', usuarioRoute);
        this.express.use('/mensagens', mensagemRoute);

    }

}