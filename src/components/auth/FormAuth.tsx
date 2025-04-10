"use client";

import Image from "next/image";
import Link from "next/link";
import useFormAuth from "../../data/hooks/useFormAuth";
import CampoBairro from "../shared/formulario/CampoBairro";
import CampoCPF from "../shared/formulario/CampoCPF";
import CampoCep from "../shared/formulario/CampoCep";
import CampoEmail from "../shared/formulario/CampoEmail";
import CampoNumero from "../shared/formulario/CampoNumero";
import CampoRua from "../shared/formulario/CampoRua";
import CampoSenha from "../shared/formulario/CampoSenha";
import CampoTelefone from "../shared/formulario/CampoTelefone";
import CampoTexto from "../shared/formulario/CampoTexto";
import CampoUf from "../shared/formulario/CampoUf";
import CampoCidade from "../shared/formulario/campoCidade";
import Logo from "../shared/Logo";
import { useRouter } from "next/navigation";
import apiClient from "@/interface_ws/apiClient";
import useSessao from "@/data/hooks/useSessao";

export default function FormAuth() {
  const {
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
    alterarFirstName,
    alterarLastName,
    alterarEmail,
    alterarSenha,
    alterarCPF,
    alterarTelefone,
    alterarDataNascimento,
    alterarEndereco,
    alterarCep,
    alterarUf,
    alterarCidade,
    alterarBairro,
    alterarRua,
    alterarNumero,
    alterarModo,
  } = useFormAuth();

  const router = useRouter();
  const { httpPost } = apiClient();
  const { iniciarSessao } = useSessao();

  const submeter = async () => {
    try {
      if (modo === "login") {
        const data = await httpPost(
          "/usuarios/login/",
          {
            email,
            password: senha,
          },
          false,
          false
        );

        if (data?.access) {
          iniciarSessao(data.access, data.usuario);

          if (data.tipo_usuario === "administrador") {
            router.push("/admin");
          } else if (data.tipo_usuario === "cliente") {
            router.push("/agendamento");
          } else {
            alert("Tipo de usuário desconhecido.");
          }
        } else {
          alert("Credenciais inválidas.");
        }
      } else if (modo === "cadastro") {
        await httpPost(
          "/usuarios/",
          {
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
          },
          false,
          false
        );

        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        alterarModo();
      }
    } catch (error: any) {
      console.error("Erro na autenticação:", error);
      alert("Erro ao tentar realizar a operação. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="h-screen">
      <Image src="/banners/principal.webp" fill alt="Banner" />
      <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full gap-10 bg-black/80">
        <Logo />
        <h1 className="text-2xl font-thin">{modo === "login" ? "Seja bem vindo" : "Cadastro"}</h1>

        <div className="flex flex-col gap-4 w-80">
          {modo === "cadastro" && (
            <>
              <CampoTexto placeholder="Primeiro Nome" value={firstName} onChangeText={alterarFirstName} />
              <CampoTexto placeholder="Sobrenome" value={lastName} onChangeText={alterarLastName} />
            </>
          )}
          <CampoEmail placeholder="E-mail" value={email} onChangeText={alterarEmail} />
          <CampoSenha placeholder="Senha" value={senha} onChangeText={alterarSenha} />

          {modo === "cadastro" && (
            <>
              <CampoCPF placeholder="CPF" value={cpf} onChangeText={alterarCPF} />
              <CampoTelefone placeholder="Telefone" value={telefone} onChangeText={alterarTelefone} />
              <CampoTexto
                placeholder="Data de Nascimento"
                value={dataNascimento}
                onChangeText={alterarDataNascimento}
              />
              <CampoTexto placeholder="Endereço" value={endereco} onChangeText={alterarEndereco} />
              <CampoCep placeholder="CEP" value={cep} onChangeText={alterarCep} />
              <CampoUf placeholder="UF" value={uf} onChangeText={alterarUf} />
              <CampoCidade placeholder="Cidade" value={cidade} onChangeText={alterarCidade} />
              <CampoBairro placeholder="Bairro" value={bairro} onChangeText={alterarBairro} />
              <CampoRua placeholder="Rua" value={rua} onChangeText={alterarRua} />
              <CampoNumero placeholder="Número" value={numero} onChangeText={alterarNumero} />
            </>
          )}

          <div className="flex gap-2">
            <button onClick={submeter} className="button flex-1 bg-green-600">
              {modo === "login" ? "Entrar" : "Cadastrar"}
            </button>
            <Link href="/" className="button flex-1 flex justify-center">
              Cancelar
            </Link>
          </div>
          <div className="flex mt-6">
            <button onClick={alterarModo} className="flex-1 button-outline">
              {modo === "login" ? (
                <div>
                  Ainda não tem conta? <span className="text-yellow-400 font-bold">Cadastre-se!</span>
                </div>
              ) : (
                <div>
                  Já tem conta? <span className="text-yellow-400 font-bold">Entre na plataforma!</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
