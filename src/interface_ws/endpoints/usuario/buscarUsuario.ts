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

export const buscarCliente = async (abortController: AbortController, token: string) => {
  try {
    const resultado: SucessoChamada<Usuario[]> | ErroChamada = await getFetcher(`${WS_BASE}usuario/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
      },
      signal: abortController.signal,
    });

    console.log("-------------------------------------");
    console.log(WS_BASE);
    console.log(`usuario/`);
    console.log(resultado);
    console.log("-------------------------------------");

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar usuario:", error);
    throw new Error("Erro ao buscar usuario.");
  }
};
