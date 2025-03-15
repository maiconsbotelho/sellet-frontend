import { getFetcher } from "@/interface_ws/fetcher";
import { WS_BASE } from "@/interface_ws/ws_link";

//Types
import { ErroChamada, SucessoChamada } from "@/util/types";

export interface Cliente {
  NOME: string;
  EMAIL: string;
  TELEFONE: number;
  SENHA: string;
}

export const buscaCliente = async (abortController: AbortController, token: string) => {
  const resultado: SucessoChamada<Cliente[]> | ErroChamada = await getFetcher(`${WS_BASE}cliente`, {
    signal: abortController.signal,
  });

  console.log("-------------------------------------");
  console.log(WS_BASE);
  console.log(`cliente`);
  console.log(resultado);
  console.log("-------------------------------------");

  return resultado;
};
