"use client";

import { useState } from "react";
import { cadastroCliente } from "@/interface_ws/endpoints/cliente/cadastroCliente";

const FormularioCadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const abortController = new AbortController();

    const novoCliente = { nome: nome, email: email, telefone: telefone, senha: senha };

    try {
      const resultado = await cadastroCliente(abortController, novoCliente);

      if (resultado.temErro) {
        setErro(resultado.MSG);
      } else {
        setSucesso(true);
        // Limpar campos ou redirecionar, conforme necessário
      }
    } catch (error) {
      setErro("Erro ao cadastrar cliente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>Cadastro realizado com sucesso!</p>}
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default FormularioCadastro;
