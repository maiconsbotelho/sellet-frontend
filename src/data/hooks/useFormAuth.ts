import { useEffect, useState } from "react";
import useAPI from "../../interface_ws/apiClient";
import { useSessaoStore } from "@/data/stores/useSessaoStore";
import { useRouter, useSearchParams } from "next/navigation";

export default function useFormAuth() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");

  const { httpPost } = useAPI();
  const { usuario, iniciarSessao } = useSessaoStore();

  const router = useRouter();
  const param = useSearchParams();

  useEffect(() => {
    if (usuario?.email) {
      const destino = param.get("destino") as string;
      router.push(destino ? destino : "/");
    }
  }, [usuario, router, param]);

  function alterarModo() {
    setModo(modo === "login" ? "cadastro" : "login");
  }

  async function submeter() {
    if (modo === "login") {
      await login();
    } else {
      await registrar();
      await login();
    }
    limparFormulario();
  }

  async function login() {
    const token = await httpPost("auth/login", { email, password: senha });
    iniciarSessao(token);
  }

  async function registrar() {
    await httpPost("auth/registrar", {
      first_name: firstName,
      last_name: lastName,
      email,
      password: senha,
      cpf,
      telefone,
      data_nascimento: dataNascimento,
      endereco,
      cep,
      uf,
      cidade,
      bairro,
      rua,
      numero,
      tipo_usuario: "cliente",
    });
  }

  function limparFormulario() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setSenha("");
    setCPF("");
    setTelefone("");
    setDataNascimento("");
    setEndereco("");
    setCep("");
    setUf("");
    setCidade("");
    setBairro("");
    setRua("");
    setNumero("");
    setModo("login");
  }

  return {
    modo,
    firstName,
    lastName,
    email,
    senha,
    cpf,
    telefone,
    dataNascimento,
    endereco,
    cep,
    uf,
    cidade,
    bairro,
    rua,
    numero,
    alterarFirstName: setFirstName,
    alterarLastName: setLastName,
    alterarEmail: setEmail,
    alterarSenha: setSenha,
    alterarCPF: setCPF,
    alterarTelefone: setTelefone,
    alterarDataNascimento: setDataNascimento,
    alterarEndereco: setEndereco,
    alterarCep: setCep,
    alterarUf: setUf,
    alterarCidade: setCidade,
    alterarBairro: setBairro,
    alterarRua: setRua,
    alterarNumero: setNumero,
    alterarModo,
    submeter,
  };
}
