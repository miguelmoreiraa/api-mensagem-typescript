export interface UsuarioInterface {
    _id: any | string;
    nome?: string; // o ? significa que é uma propriedade opcional.
    senha?: string;
    avatar?: string;
}

export interface MensagemUsuario extends UsuarioInterface {
    ultimaMensagem: string;
    dataUltimaMensagem: Date;
}