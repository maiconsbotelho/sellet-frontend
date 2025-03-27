import { getFetcher } from "@/interface_ws/fetcher";
import { WS_BASE } from "@/interface_ws/ws_link";

// Types
import { ErroChamada, SucessoChamada } from "@/util/types";

export interface Servico {
  nome: string;
  descricao: string;
  duracao: number; // Duração em minutos
  preco: number; // Preço do serviço
  profissional?: number; // ID do profissional (opcional, será atribuído automaticamente para profissionais)
}

export const buscarServico = async (abortController: AbortController, token: string) => {
  try {
    const resultado: SucessoChamada<Servico[]> | ErroChamada = await getFetcher(`${WS_BASE}servico/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
      },
      signal: abortController.signal,
    });

    console.log("-------------------------------------");
    console.log(WS_BASE);
    console.log(`servico/`);
    console.log(resultado);
    console.log("-------------------------------------");

    return resultado;
  } catch (error) {
    console.error("Erro ao buscar servico:", error);
    throw new Error("Erro ao buscar servico.");
  }
};
