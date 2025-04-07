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
import { WS_BASE } from "@/interface_ws/ws_link";

import Logo from "../shared/Logo";
import { useRouter } from "next/navigation"; // Importa o hook para redirecionamento

export default function FormAuth() {
  const {
    modo,
    nome,
    email,
    senha,
    cpf,
    telefone,
    cep,
    uf,
    cidade,
    bairro,
    rua,
    numero,
    alterarNome,
    alterarEmail,
    alterarSenha,
    alterarCPF,
    alterarTelefone,
    alterarCep,
    alterarUf,
    alterarCidade,
    alterarBairro,
    alterarRua,
    alterarNumero,
    alterarModo,
  } = useFormAuth();

  const router = useRouter(); // Hook para redirecionamento

  const submeter = async () => {
    if (modo === "login") {
      try {
        const res = await fetch(`${WS_BASE}usuarios/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password: senha }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Resposta do login:", data); // Log para verificar a resposta do backend

          // Armazena o token de acesso no localStorage
          if (data.access) {
            localStorage.setItem("token", data.access);
          } else {
            alert("Erro: Token de acesso não encontrado na resposta.");
            return;
          }

          // Opcional: Armazena o token de refresh, se necessário
          if (data.refresh) {
            localStorage.setItem("refresh_token", data.refresh);
          }

          // Redireciona com base no tipo de usuário
          const tipoUsuario = data.tipo_usuario;
          if (tipoUsuario === "administrador") {
            router.push("/admin");
          } else if (tipoUsuario === "cliente") {
            router.push("/agendamento");
          } else {
            alert("Tipo de usuário desconhecido.");
          }
        } else {
          alert("Credenciais inválidas!");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Ocorreu um erro ao tentar fazer login.");
      }
    } else if (modo === "cadastro") {
      try {
        const res = await fetch(`${WS_BASE}usuarios/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MjM5OTIyLCJpYXQiOjE3NDQwNjcxMjIsImp0aSI6ImRlMjhkMDljZWU2MjRlOTFhZmQ1OTkxZWY5NTFmYzE3IiwidXNlcl9pZCI6OH0.ZY8GQhnpdP1N2JfvtT8xODJm99PvZT0TJsxAqqjgY_Y", // Adiciona o token manualmente
          },
          body: JSON.stringify({
            username: nome, // Mapeia o campo "nome" para "username"
            email,
            password: senha, // Certifique-se de que o campo "senha" está correto
            tipo_usuario: "cliente", // Define o tipo de usuário como "cliente"
            // cpf,
            // telefone,
            // cep,
            // uf,
            // cidade,
            // bairro,
            // rua,
            // numero,
          }),
        });

        if (res.ok) {
          alert("Cadastro realizado com sucesso! Faça login para continuar.");
          alterarModo(); // Alterna para o modo de login
        } else {
          alert("Erro ao realizar cadastro. Verifique os dados e tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao fazer cadastro:", error);
        alert("Ocorreu um erro ao tentar realizar o cadastro.");
      }
    }
  };

  return (
    <div className="h-screen">
      <Image src="/banners/principal.webp" fill alt="Banner" />
      <div
        className="
                    flex flex-col justify-center items-center
                    absolute top-0 left-0 w-full h-full gap-10
                    bg-black/80
                "
      >
        <Logo />
        <div>
          {modo === "login" ? (
            <h1 className="text-2xl font-thin">Seja bem vindo</h1>
          ) : (
            <h1 className="text-2xl font-thin">Cadastro</h1>
          )}
        </div>
        <div className="flex flex-col gap-4 w-80">
          {modo === "cadastro" && <CampoTexto placeholder="Nome" value={nome} onChangeText={alterarNome} />}
          <CampoEmail placeholder="E-mail" value={email} onChangeText={alterarEmail} />
          <CampoSenha placeholder="Senha" value={senha} onChangeText={alterarSenha} />

          {modo === "cadastro" && (
            <>
              <CampoCPF placeholder="CPF" value={cpf} onChangeText={alterarCPF} />
              <CampoTelefone placeholder="Telefone" value={telefone} onChangeText={alterarTelefone} />

              {/* Endereço */}
              <CampoCep placeholder="CEP" value={cep} onChangeText={alterarCep} />

              <CampoUf placeholder="UF" value={uf} onChangeText={alterarUf} className="col-span-1" />

              <CampoCidade placeholder="Cidade" value={cidade} onChangeText={alterarCidade} className="col-span-2" />

              <CampoBairro placeholder="Bairro" value={bairro} onChangeText={alterarBairro} />
              <CampoRua placeholder="Rua" value={rua} onChangeText={alterarRua} className="col-span-2" />
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
