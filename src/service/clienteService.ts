import { WS_BASE } from "@/interface_ws/ws_link";

export const getClienteById = async (id: string, token: string) => {
  const response = await fetch(`${WS_BASE}usuarios/${id}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar cliente");
  }

  return response.json();
};

// clienteService.ts
export const addCliente = async (formData: FormData, token: string) => {
  const response = await fetch(`${WS_BASE}usuarios/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar cliente");
  }

  return response.json();
};

export const editCliente = async (id: string, clienteAtualizado: any, token: string) => {
  const isFormData = clienteAtualizado instanceof FormData;

  const response = await fetch(`${WS_BASE}usuarios/${id}/`, {
    method: "PUT",
    headers: isFormData
      ? { Authorization: `Bearer ${token}` } // Não inclua "Content-Type" para FormData
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    body: isFormData ? clienteAtualizado : JSON.stringify(clienteAtualizado),
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
