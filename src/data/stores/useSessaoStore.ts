import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  is_admin?: boolean;
  [key: string]: any;
}

interface SessaoState {
  token: string | null;
  usuario: Usuario | null;
  iniciarSessao: (token: string) => void; // Add this property
  setToken: (token: string) => void;
  logout: () => void;
}

export const useSessaoStore = create<SessaoState>()(
  persist(
    (set) => ({
      token: null,
      usuario: null,

      setToken: (token: string) => {
        const usuario = jwtDecode<Usuario>(token);
        set({ token, usuario });
      },
      iniciarSessao: (token: string) => {
        const usuario = jwtDecode<Usuario>(token);
        set({ token, usuario });
      },

      logout: () => {
        set({ token: null, usuario: null });
      },
    }),
    {
      name: "sessao", // nome da chave no localStorage
    }
  )
);
