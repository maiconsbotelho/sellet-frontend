import { getFetcher } from "@/interface_ws/fetcher";
import { WS_BASE } from "@/interface_ws/ws_link";

// Types
import { ErroChamada, SucessoChamada } from "@/util/types";

export interface Usuario {
  id: number;
  username: string;
  email: string;
  telefone?: string;
  senha: string;
  tipo_usuario?: string; // cliente, profissional ou administrador
}

export const buscarCliente = async (
  abortController: AbortController,
  token: string,
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const resultado: SucessoChamada<Usuario[]> | ErroChamada = await getFetcher(
      `${WS_BASE}usuarios/?page=${page}&page_size=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: abortController.signal,
      }
    );

    console.log("-------------------------------------");
    console.log("Requisição para:", `${WS_BASE}usuarios/`);
    console.log("Resultado recebido:", resultado);
    console.log("-------------------------------------");

    // Verifica se há erro
    if ("temErro" in resultado && resultado.temErro) {
      return { temErro: true, MSG: resultado.MSG || "Erro desconhecido", aborted: false };
    }

    // Garante que o retorno seja um array de usuários
    const clientes = resultado ? Object.values(resultado).filter((item) => typeof item === "object") : [];
    return { temErro: false, retorno: clientes };
  } catch (error) {
    if (abortController.signal.aborted) {
      return { temErro: true, MSG: "Requisição cancelada pelo usuário", aborted: true };
    }
    console.error("Erro ao buscar usuário:", error);
    return { temErro: true, MSG: "Erro ao buscar usuário.", aborted: false };
  }
};
