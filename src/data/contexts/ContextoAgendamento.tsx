"use client";
import { createContext, useEffect, useState } from "react";
import { agendamentoAPI } from "@/interface_ws/endpoints/agendamentoAPI";
import Profissional from "@/core/profissional/model/Profissional";
import Servico from "@/core/servico/model/Servico";
import { useRouter } from "next/navigation";

export interface ContextoAgendamentoProps {
  profissional: Profissional | null;
  servicos: Servico[];
  data: Date | null;
  horariosOcupados: string[];
  selecionarProfissional: (profissional: Profissional | null) => void;
  selecionarServicos: (servicos: Servico[]) => void;
  selecionarData: (data: Date) => void;
  agendar: () => Promise<void>;
  precoTotal: () => number;
}

const ContextoAgendamento = createContext<ContextoAgendamentoProps>({} as any);

export function ProvedorAgendamento(props: any) {
  const router = useRouter();

  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [data, setData] = useState<Date | null>(null);

  async function agendar() {
    if (!profissional || !data || servicos.length === 0) {
      alert("Preencha todos os campos antes de agendar.");
      return;
    }

    await agendamentoAPI.addAgendamento({
      data,
      profissional,
      servicos,
      status: "pendente", // Define o status inicial
    });

    router.push("/agendamento/sucesso");
    limpar();
  }

  function limpar() {
    setProfissional(null);
    setServicos([]);
    setData(null);
  }

  function precoTotal() {
    return servicos.reduce((acc, servico) => acc + servico.preco, 0);
  }

  useEffect(() => {
    if (!data || !profissional) return;
    agendamentoAPI.getHorariosDisponiveis(data.toISOString().slice(0, 10)).then(setHorariosOcupados);
  }, [data, profissional]);

  return (
    <ContextoAgendamento.Provider
      value={{
        profissional,
        servicos,
        data,
        horariosOcupados,
        selecionarProfissional: setProfissional,
        selecionarServicos: setServicos,
        selecionarData: setData,
        agendar,
        precoTotal,
      }}
    >
      {props.children}
    </ContextoAgendamento.Provider>
  );
}

export default ContextoAgendamento;
