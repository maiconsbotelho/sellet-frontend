"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      {/* Botão visível apenas no mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" text-[var(--text-secondary)] text-[23px] rounded sm:hidden"
      >
        {isOpen ? <IoClose /> : <GiHamburgerMenu />}
      </button>

      {/* Menu - Sempre visível no desktop (lg) */}
      <div
        className={`fixed top-[70px] right-0  items-center w-full  shadow-lg rounded  sm:static sm:shadow-none sm:border-none sm:block transition-all duration-700 ease-out ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col bg-[var(--bg-secondary)] sm:bg-transparent text-[var(--text-primary)] sm:text-[var(--text-secondary)]  sm:flex-row sm:gap-4 p-2">
          <li className="p-2 hover:bg-gray-500 cursor-pointer border-b-2 lg:hover:bg-transparent">Home</li>
          <li className="p-2 hover:bg-gray-500 cursor-pointer lg:hover:bg-transparent">Sobre</li>
          <li className="p-2 hover:bg-gray-500 cursor-pointer lg:hover:bg-transparent">Contato</li>
        </ul>
      </div>
    </div>
  );
}
