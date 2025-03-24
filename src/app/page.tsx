import NavBar from "@/components/navBar";
import FormularioCliente from "@/components/formulario/formularioCliente";
import Agenda from "@/components/agenda";

export default function Home() {
  return (
    <div className="w-screen h-screen ">
      <NavBar />
      <FormularioCliente />
      <Agenda />
    </div>
  );
}
