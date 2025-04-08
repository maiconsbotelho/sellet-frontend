import DashboardSemanal from "@/components/agendamento/dashboardAgendamentos";
import Dashboard from "@/components/agendamento/simuladorAgendamento";
import SimuladorAgendamento from "@/components/agendamento/simuladorAgendamentoAPI";
import Home from "@/components/home";
import Landing from "@/components/landing/landing";

export default function HomePage() {
  return (
    <div>
      {/* <Home /> */}
      {/* <Landing /> */}
      {/* <Dashboard /> */}
      {/* <SimuladorAgendamento /> */}
      <DashboardSemanal />
    </div>
  );
}
