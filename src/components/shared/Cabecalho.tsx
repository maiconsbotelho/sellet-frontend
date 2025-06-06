"use client";
import Link from "next/link";
import Logo from "./Logo";
// import useSessao from "@/data/hooks/useSessao";
import { useSessaoStore } from "@/data/stores/useSessaoStore";
import MenuUsuario from "./MenuUsuario";

export default function Cabecalho() {
  // const { usuario } = useSessao();
  const { usuario } = useSessaoStore();
  return (
    <header className="flex items-center h-24 bg-pink-950/60 self-stretch">
      <nav className="flex items-center text-white justify-between container">
        <Logo />
        <div>{usuario ? <MenuUsuario /> : <Link href="/entrar">Entrar</Link>}</div>
      </nav>
    </header>
  );
}
