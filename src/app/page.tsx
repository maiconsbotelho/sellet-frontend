import NavBar from "@/components/navBar";
import FormularioCliente from "@/components/formulario/formularioCliente";
import Agenda from "@/components/agenda";
import Dashboard from "@/components/dashboard/dashboard";

export default function Home() {
  return (
    <div className="w-screen h-screen ">
      <NavBar />
      <Dashboard />
      {/* <FormularioCliente />
      <Agenda /> */}
    </div>
  );
}
