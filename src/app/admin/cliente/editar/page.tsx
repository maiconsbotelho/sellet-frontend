"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { editCliente, getClienteById } from "@/interface_ws/endpoints/usuarioAPI";

const EditarClientePage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); // Obtém o ID do cliente da URL

  if (Array.isArray(id)) {
    return <div className="text-center text-red-500 font-semibold">ID inválido.</div>;
  }

  if (!id) {
    return <div className="text-center text-red-500 font-semibold">ID do cliente não encontrado.</div>;
  }

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    telefone: "",
    cpf: "",
    foto_perfil: null as File | null,
    tipo_usuario: "cliente",
    data_nascimento: "",
    endereco: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const cliente = await getClienteById(id, token); // Busca os dados do cliente
        setFormData(cliente); // Preenche o formulário com os dados do cliente
      } catch (err) {
        setError("Erro ao carregar os dados do cliente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, foto_perfil: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value as string | Blob);
      }
    });

    try {
      const token = localStorage.getItem("token") || "";
      await editCliente(id, formDataToSend, token); // Atualiza o cliente
      router.push("/admin/cliente"); // Redireciona para a lista de clientes
    } catch (err) {
      setError("Erro ao editar cliente. Verifique os dados e tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="min-h-screen h-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Editar Cliente</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nome (Obrigatório)
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email (Obrigatório)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
              Telefone (Opcional)
            </label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
              CPF (Opcional)
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="foto_perfil" className="block text-sm font-medium text-gray-700">
              Foto de Perfil (Opcional)
            </label>
            <input
              type="file"
              id="foto_perfil"
              name="foto_perfil"
              onChange={handleFileChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="data_nascimento" className="block text-sm font-medium text-gray-700">
              Data de Nascimento (Opcional)
            </label>
            <input
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
              Endereço (Opcional)
            </label>
            <textarea
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarClientePage;
