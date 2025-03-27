import { getFetcher } from "@/interface_ws/fetcher";
import { WS_BASE } from "@/interface_ws/ws_link";

// Types
import { ErroChamada, SucessoChamada } from "@/util/types";

export interface Usuario {
  username: string;
  email: string;
  telefone?: string;
  senha: string;
  tipo_usuario?: string; // cliente, profissional ou administrador
}

// Função para cadastrar cliente
export const cadastrarUsuario = async (abortController: AbortController, novoUsuario: Usuario, token: string) => {
  try {
    console.log("Enviando dados para o backend:", novoUsuario);

    const resultado: SucessoChamada<Usuario> | ErroChamada = await getFetcher(`${WS_BASE}usuarios/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
      },
      body: JSON.stringify(novoUsuario),
      signal: abortController.signal,
    });

    console.log("Cadastro realizado com sucesso!");
    return resultado;
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    throw new Error("Erro ao cadastrar cliente.");
  }
};
