"use client";

import { useState } from "react";
import useCadastroCliente from "@/hooks/cliente/useCadastroCliente";
import InputField from "@/components/shared/formularioBase/inputField/inputField";
import Mensagem from "@/components/shared/mensagem/mensagem";
import FormularioBase from "@/components/shared/formularioBase/formularioBase";

const FormularioCliente = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", senha: "" });
  const { cadastrar, erro, sucesso, carregando } = useCadastroCliente();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sucessoCadastro = await cadastrar(formData);

    if (sucessoCadastro) {
      setFormData({ nome: "", email: "", telefone: "", senha: "" });
    }
  };

  return (
    <FormularioBase titulo="Cadastro de Cliente" onSubmit={handleSubmit}>
      <div className="space-y-4 p-6 bg-white shadow-lg rounded-2xl w-full max-w-md mx-auto">
        <InputField
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <InputField
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <InputField
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {erro && <Mensagem texto={erro} tipo="erro" />}
        {sucesso && <Mensagem texto="Cadastro realizado com sucesso!" tipo="sucesso" />}
        {carregando && <p className="text-gray-500 text-sm">Carregando...</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Cadastrar
        </button>
      </div>
    </FormularioBase>
  );
};

export default FormularioCliente;
