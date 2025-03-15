import { getFetcher } from "@/interface_ws/fetcher";
import { WS_BASE } from "@/interface_ws/ws_link";

// Types
import { ErroChamada, SucessoChamada } from "@/util/types";

export interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
}

// Função para cadastrar cliente
export const cadastroCliente = async (abortController: AbortController, novoCliente: Cliente) => {
  try {
    console.log("Enviando dados para o backend:", novoCliente);
    const resultado: SucessoChamada<Cliente> | ErroChamada = await getFetcher(`${WS_BASE}clientes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoCliente),
      signal: abortController.signal,
    });

    console.log("Cadastro realizado com sucesso!");
    return resultado;
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    throw new Error("Erro ao cadastrar cliente.");
  }
};
