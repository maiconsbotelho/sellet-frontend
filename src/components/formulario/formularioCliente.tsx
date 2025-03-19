"use client";

import { useState } from "react";
import useCadastroCliente from "@/hooks/cliente/useCadastroCliente";
import InputField from "@/components/shared/inputField/inputField";
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
      <InputField type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
      <InputField type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <InputField
        type="text"
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={handleChange}
      />
      <InputField type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} />

      {erro && <Mensagem texto={erro} tipo="erro" />}
      {sucesso && <Mensagem texto="Cadastro realizado com sucesso!" tipo="sucesso" />}
      {carregando && <p>Carregando...</p>}
    </FormularioBase>
  );
};

export default FormularioCliente;
