import { useState, useEffect } from "react";
import { buscarCliente } from "@/interface_ws/endpoints/usuario/buscarUsuario";
import { Usuario } from "@/interface_ws/endpoints/usuario/buscarUsuario";

export const useClientes = () => {
  const [clientes, setClientes] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const token = localStorage.getItem("token");

    const fetchClientes = async () => {
      try {
        if (!token) {
          setError("Token não encontrado.");
          setLoading(false);
          return;
        }

        const resultado = await buscarCliente(abortController, token);

        if (abortController.signal.aborted) return;

        if (resultado.temErro) {
          setError(resultado.MSG ?? null);
        } else {
          // Filtra apenas os usuários do tipo "cliente"
          const clientesFiltrados = (resultado.retorno || []).filter((usuario) => usuario.tipo_usuario === "cliente");
          setClientes(clientesFiltrados);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError("Erro ao buscar clientes.");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchClientes();

    return () => {
      if (!abortController.signal.aborted) {
        abortController.abort();
      }
    };
  }, []);

  return { clientes, loading, error };
};
