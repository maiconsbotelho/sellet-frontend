"use client";

import React, { useEffect, useState } from "react";
import { buscarCliente } from "@/interface_ws/endpoints/usuario/buscarUsuario";
import { Usuario } from "@/interface_ws/endpoints/usuario/buscarUsuario";

const UserList: React.FC = () => {
  const [clientes, setClientes] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const token = localStorage.getItem("token"); // Assuming the token is stored in local storage

    const fetchClientes = async () => {
      if (token) {
        const resultado = await buscarCliente(abortController, token);
        if (resultado.temErro) {
          setError(resultado.MSG);
        } else {
          setClientes(resultado.retorno);
        }
      } else {
        setError("Token não encontrado.");
      }
      setLoading(false);
    };

    fetchClientes();

    return () => {
      abortController.abort(); // Cleanup on unmount
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
