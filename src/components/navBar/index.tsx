"use client";

import { useState } from "react";
import Menu from "../menu";
import Logo from "../logo";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div className="relative">
    //   {/* Botão para abrir/fechar */}
    //   <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-500 text-white px-4 py-2 rounded">
    //     {isOpen ? "Fechar Menu" : "Abrir Menu"}
    //   </button>

    //   {/* Menu (visível apenas se isOpen for true) */}
    //   {isOpen && (
    //     <div className="absolute top-12 left-0 bg-blue-700 shadow-lg border rounded w-48">
    //       <ul className="flex flex-col p-2">
    //         <li className="p-2 hover:bg-gray-100 cursor-pointer">Home</li>
    //         <li className="p-2 hover:bg-gray-100 cursor-pointer">Sobre</li>
    //         <li className="p-2 hover:bg-gray-100 cursor-pointer">Contato</li>
    //       </ul>
    //     </div>
    //   )}
    // </div>
    <div className="flex justify-between w-screen h-[70px] items-center p-4 bg-[var(--primary-color)] text-white">
      <Logo />
      <Menu />
    </div>
  );
}
