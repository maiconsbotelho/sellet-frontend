// src/app/page.tsx

"use client"; // Mark this as a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Change this line
import NavBar from "@/components/navBar";
import FormularioCliente from "@/components/formulario/formularioCliente";
import Agenda from "@/components/agenda";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Some logic here
  }, []);

  return (
    <div>
      <NavBar />
      <FormularioCliente />
      <Agenda />
    </div>
  );
};

export default Page;
