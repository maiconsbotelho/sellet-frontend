"use client";

import React from "react";
import { useClientes } from "@/hooks/usuario/useClientes";

const UserList: React.FC = () => {
  const { clientes, loading, error } = useClientes();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.email}>
            {cliente.username} - {cliente.email} - {cliente.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
