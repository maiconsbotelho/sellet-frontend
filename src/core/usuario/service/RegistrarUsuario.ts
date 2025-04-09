import CasoDeUso from "../../shared/CasoDeUso";
import Usuario from "../model/Usuario";
import { usuarioAPI } from "@/interface_ws/endpoints/usuarioAPI";

export default class RegistrarUsuario implements CasoDeUso<Usuario, void> {
  async executar(usuario: Usuario): Promise<void> {
    const usuarioExistente = await usuarioAPI.buscarPorEmail(usuario.email);

    if (usuarioExistente) {
      throw new Error("Usuário já existe");
    }

    if (!usuario.password) {
      throw new Error("Senha é obrigatória");
    }

    // Envia o usuário diretamente ao backend
    await usuarioAPI.addUsuario(usuario);
  }
}
