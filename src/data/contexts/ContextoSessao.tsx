"use client";
import Usuario from "@/core/usuario/model/Usuario";
import { createContext, useEffect, useState } from "react";
import cookie from "js-cookie";

interface ContextoSessaoProps {
  carregando: boolean;
  token: string | null;
  usuario: Usuario | null;
  iniciarSessao: (token: string, usuario: Usuario) => void;
  encerrarSessao: () => void;
}

const ContextoSessao = createContext<ContextoSessaoProps>({} as any);
export default ContextoSessao;

export function ProvedorSessao(props: any) {
  const nomeCookie = "_sellet_token";

  const [carregando, setCarregando] = useState(true);
  const [sessao, setSessao] = useState<{ token: string | null; usuario: Usuario | null }>({
    token: null,
    usuario: null,
  });

  useEffect(() => {
    const token = cookie.get(nomeCookie);
    if (token) {
      // O backend deve validar o token e retornar os dados do usuário
      setSessao({ token, usuario: null });
    }
    setCarregando(false);
  }, []);

  function iniciarSessao(token: string, usuario: Usuario) {
    cookie.set(nomeCookie, token, { expires: 1 });
    setSessao({ token, usuario });
  }

  function encerrarSessao() {
    cookie.remove(nomeCookie);
    setSessao({ token: null, usuario: null });
  }

  return (
    <ContextoSessao.Provider
      value={{
        carregando,
        token: sessao.token,
        usuario: sessao.usuario,
        iniciarSessao,
        encerrarSessao,
      }}
    >
      {props.children}
    </ContextoSessao.Provider>
  );
}
