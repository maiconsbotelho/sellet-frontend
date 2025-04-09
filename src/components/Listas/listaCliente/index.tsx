"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClientes } from "@/hooks/usuario/useClientes";
import UserList from "@/components/ui/UserList";
import { addCliente, editCliente, deleteCliente } from "@/service/usuarioService";

const ListaCliente: React.FC = () => {
  const router = useRouter();
  const { clientes, loading, error, fetchClientes } = useClientes();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleAddCliente = async () => {
    const formData = new FormData();
    formData.append("username", "Novo Cliente");
    formData.append("email", "novo@cliente.com");
    formData.append("telefone", "123456789");

    try {
      const token = localStorage.getItem("token") || "";
      await addCliente(formData, token);
      fetchClientes(); // Atualiza a lista de clientes
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCliente = async (id: string) => {
    const formData = new FormData();
    formData.append("username", "Cliente Editado");
    formData.append("email", "editado@cliente.com");
    formData.append("telefone", "987654321");

    try {
      const token = localStorage.getItem("token") || "";
      await editCliente(id, formData, token);
      fetchClientes(); // Atualiza a lista de clientes
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCliente = async (id: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      await deleteCliente(id, token);
      fetchClientes(); // Atualiza a lista de clientes
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold">Erro: {error}</div>;
  }

  return (
    <UserList
      title="Lista de Clientes"
      items={clientes.map((cliente) => ({
        id: cliente.id.toString(),
        name: cliente.username,
        email: cliente.email,
        phone: cliente.telefone,
      }))}
      onAdd={handleAddCliente}
      onEdit={handleEditCliente}
      onDelete={handleDeleteCliente}
    />
  );
};

export default ListaCliente;
