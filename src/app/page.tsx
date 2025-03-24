import NavBar from "@/components/navBar";
import FormularioCliente from "@/components/formulario/formularioCliente";
import Agenda from "@/components/agendamentos";

export default function Home() {
  return (
    <div className="w-screen h-screen ">
      <NavBar />
      <FormularioCliente />
      <Agenda />
    </div>
  );
}
