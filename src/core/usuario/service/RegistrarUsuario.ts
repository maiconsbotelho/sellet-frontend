import CasoDeUso from "../../shared/CasoDeUso";
import Usuario from "../model/Usuario";
import { usuarioService } from "@/service/usuarioService";

export default class RegistrarUsuario implements CasoDeUso<Usuario, void> {
  async executar(usuario: Usuario): Promise<void> {
    const usuarioExistente = await usuarioService.buscarPorEmail(usuario.email);

    if (usuarioExistente) {
      throw new Error("Usuário já existe");
    }

    if (!usuario.password) {
      throw new Error("Senha é obrigatória");
    }

    // Envia o usuário diretamente ao backend
    await usuarioService.addUsuario(usuario);
  }
}
