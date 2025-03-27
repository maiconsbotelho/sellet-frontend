import { getFetcher } from "@/interface_ws/fetcher";
import { WS_BASE } from "@/interface_ws/ws_link";

// Types
import { ErroChamada, SucessoChamada } from "@/util/types";

export interface Servico {
  nome: string;
  descricao: string;
  duracao: number; // Duração em minutos
  preco: number; // Preço do serviço
  profissionais?: number[]; // IDs dos profissionais associados
}

// Função para cadastrar serviço
export const cadastrarServico = async (abortController: AbortController, novoServico: Servico, token: string) => {
  try {
    console.log("Enviando dados para o backend:", novoServico);

    const resultado: SucessoChamada<Servico> | ErroChamada = await getFetcher(`${WS_BASE}servico/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
      },
      body: JSON.stringify(novoServico),
      signal: abortController.signal,
    });

    console.log("Cadastro realizado com sucesso!");
    return resultado;
  } catch (error) {
    console.error("Erro ao cadastrar serviço:", error);
    throw new Error("Erro ao cadastrar serviço.");
  }
};
