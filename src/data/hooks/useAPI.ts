import { useCallback } from "react";
import useSessao from "./useSessao";
import { getFetcher, postFetcher } from "@/interface_ws/fetcher";
import { WS_BASE } from "@/interface_ws/ws_link";

export default function useAPI() {
  const { token } = useSessao();

  function construirURL(caminho: string) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    return `${WS_BASE}${uri}`;
  }

  function construirHeaders(authRequired: boolean) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (authRequired && token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  const httpGet = useCallback(
    async (caminho: string, authRequired = true) => {
      try {
        const url = construirURL(caminho);
        const headers = construirHeaders(authRequired);
        return await getFetcher(url, { headers });
      } catch (error) {
        console.error("Erro em httpGet:", error);
        throw error;
      }
    },
    [token]
  );

  const httpPost = useCallback(
    async (caminho: string, body: any, hasItems = false, authRequired = true) => {
      try {
        const url = construirURL(caminho);
        const headers = construirHeaders(authRequired);
        return await postFetcher(url, body, hasItems, { headers });
      } catch (error) {
        console.error("Erro em httpPost:", error);
        throw error;
      }
    },
    [token]
  );

  const httpPut = useCallback(
    async (caminho: string, body: any, authRequired = true) => {
      try {
        const url = construirURL(caminho);
        const headers = construirHeaders(authRequired);

        const resposta = await fetch(url, {
          method: "PUT",
          headers,
          body: JSON.stringify(body),
        });

        if (!resposta.ok) {
          throw new Error(`Erro ${resposta.status} ao fazer PUT`);
        }

        return await resposta.json();
      } catch (error) {
        console.error("Erro em httpPut:", error);
        throw error;
      }
    },
    [token]
  );

  const httpDelete = useCallback(
    async (caminho: string, authRequired = true) => {
      try {
        const url = construirURL(caminho);
        const headers = construirHeaders(authRequired);

        const resposta = await fetch(url, {
          method: "DELETE",
          headers,
        });

        if (!resposta.ok) {
          throw new Error("Erro ao deletar");
        }

        return true;
      } catch (error) {
        console.error("Erro em httpDelete:", error);
        throw error;
      }
    },
    [token]
  );

  return {
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
  };
}
