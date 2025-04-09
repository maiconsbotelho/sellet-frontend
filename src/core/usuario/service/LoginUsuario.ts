import CasoDeUso from "../../shared/CasoDeUso";
import { usuarioAPI } from "@/interface_ws/endpoints/usuarioAPI";

type Entrada = {
  email: string;
  password: string;
};

type Saida = {
  token: string;
};

export default class LoginUsuario implements CasoDeUso<Entrada, Saida> {
  async executar(entrada: Entrada): Promise<Saida> {
    const { email, password } = entrada;

    // Envia email e senha diretamente ao backend
    const resposta = await usuarioAPI.login({ email, password });

    if (!resposta.token) {
      throw new Error("Falha na autenticação");
    }

    return resposta;
  }
}
