import { Document, DocumentQuery, Model, model, Schema } from "mongoose";
import { MensagemInterface } from "../interfaces/mensagem.interface";

interface MensagemModel extends MensagemInterface, Document { }

interface MensagemStatic extends Model<MensagemModel> {
    buscaChat(idUsuarioLogado: string, idUsuarioChat: string): DocumentQuery<MensagemModel[], MensagemModel>
}

const MensagemSchema = new Schema({
    texto: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // ao enviar o texto da mensagem ele criará o horário e data do momento
    },
    remetente: {
        type: Schema.Types.ObjectId, // FK, estou referenciando o ID da tabela usuario
        ref: 'Usuario',
        required: true,
    },
    destinatario: {
        type: Schema.Types.ObjectId, // FK, estou referenciando o ID da tabela usuario
        ref: 'Usuario',
        required: true,
    }
});



MensagemSchema.statics.buscaChat = function (idUsuarioLogado: string, idUsuarioChat: string): DocumentQuery<MensagemModel[], MensagemModel> {
    return this.find({
        $or: [
            { $and: [{ remetente: idUsuarioLogado }, { destinatario: idUsuarioChat }] },
            { $and: [{ remetente: idUsuarioChat }, { destinatario: idUsuarioLogado }] },

        ]
    })
}

export default model<MensagemModel, MensagemStatic>('Mensagem', MensagemSchema);