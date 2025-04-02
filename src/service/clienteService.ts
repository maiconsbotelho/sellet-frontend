import { WS_BASE } from "@/interface_ws/ws_link";

export const addCliente = async (novoCliente: any, token: string) => {
  const response = await fetch(`${WS_BASE}usuarios/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(novoCliente),
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar cliente");
  }

  return await response.json();
};

export const editCliente = async (id: string, clienteAtualizado: any, token: string) => {
  const response = await fetch(`${WS_BASE}usuarios/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(clienteAtualizado),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar cliente");
  }

  return await response.json();
};

export const deleteCliente = async (id: string, token: string) => {
  const response = await fetch(`${WS_BASE}usuarios/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir cliente");
  }

  return await response.json();
};
