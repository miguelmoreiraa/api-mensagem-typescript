import { MensagemInterface } from "../interfaces/mensagem.interface";
import { MensagemUsuario, UsuarioInterface } from "../interfaces/usuario.interface";

class MensagemService {

    public getResultadoMensagemUsuario(mensagens: MensagemInterface[], usuario: UsuarioInterface): MensagemUsuario {
        return {
            _id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar,
            // COM A ATUALIZAÇÃO DO TYPESCRIPT EU POSSO USAR O OPTIONAL CHAINING "mensagens[0]?.texto || null", ENTÃO SE MENSAGEM NA POSIÇÃO ZERO REALMENTE EXISTE EU PEGO O TEXTO, SE NÃO PEGO O NULO
            ultimaMensagem: mensagens[0]?.texto || null, // existe mensagem, se existir traga essa mensagem, senão retorna nulo "mensagens[0] ? mensagens[0].createdAt : null,"
            dataUltimaMensagem: mensagens[0]?.createdAt || null,
        }
    }

    public retornaMensagensOrdenadas(usuarioMensagem: MensagemUsuario[]): MensagemUsuario[] {
        return usuarioMensagem.sort((a, b) => {  
            return (a.dataUltimaMensagem ? 0 : 1) - (b.dataUltimaMensagem ? 0 : 1) // VERIFICANDO PRA VER SE O USUARIO TEM MENSAGEM
                || -(a.dataUltimaMensagem > b.dataUltimaMensagem) // // FAZENDO AS COMPARAÇÕES DAS DATAS AS ÚLTIMA VEM EM PRIMEIRO
                || +(a.dataUltimaMensagem < b.dataUltimaMensagem)
        })
    }


}

export default new MensagemService();