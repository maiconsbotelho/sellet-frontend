"use client";

import { useEffect, useMemo, useState } from "react";
import useAPI from "@/interface_ws/apiClient";
import { toast } from "sonner";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Agendamento {
  id: number;
  data: string;
  hora: string;
  cliente: {
    nome: string;
  };
  duracao: number;
}

export default function DashboardSemanal() {
  const { httpGet, httpPost, httpPut, httpDelete } = useAPI();

  // Calcula os dias da semana com base na data atual
  const diasDaSemana = useMemo(() => {
    const hoje = new Date();
    const inicioDaSemana = new Date(hoje.setDate(hoje.getDate() - hoje.getDay())); // Início da semana (domingo)
    return Array.from({ length: 7 }, (_, i) => {
      const dia = new Date(inicioDaSemana);
      dia.setDate(inicioDaSemana.getDate() + i);
      return dia;
    });
  }, []);

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState<Date | null>(null);
  const [horaSelecionada, setHoraSelecionada] = useState<string>("");

  const [nomeCliente, setNomeCliente] = useState("");
  const [duracao, setDuracao] = useState(30);
  const [idAgendamento, setIdAgendamento] = useState<number | null>(null);
  const [salvando, setSalvando] = useState(false);

  const horarios = useMemo(() => {
    const hs = [];
    for (let h = 8; h <= 21; h++) {
      hs.push(`${String(h).padStart(2, "0")}:00`);
      hs.push(`${String(h).padStart(2, "0")}:30`);
    }
    return hs;
  }, []);

  useEffect(() => {
    async function carregarAgendamentos() {
      if (diasDaSemana.length === 0) {
        console.warn("diasDaSemana está vazio");
        return;
      }
      setCarregando(true);
      setErro(null);
      try {
        console.log("Carregando agendamentos para:", diasDaSemana);
        const inicio = diasDaSemana[0].toISOString().slice(0, 10);
        const fim = diasDaSemana[6].toISOString().slice(0, 10);
        const dados = await httpGet(`/agendamentos?inicio=${inicio}&fim=${fim}`);

        // Transformar os dados para incluir o nome do cliente
        const agendamentosTransformados = await Promise.all(
          dados.map(async (agendamento: Agendamento) => {
            const cliente = await httpGet(`/usuarios/${agendamento.cliente}`);
            return {
              ...agendamento,
              cliente: { nome: `${cliente.first_name} ${cliente.last_name}` },
            };
          })
        );

        console.log("Dados transformados:", agendamentosTransformados);
        setAgendamentos(agendamentosTransformados);
      } catch (err) {
        console.error("Erro ao carregar agendamentos:", err);
        setErro("Erro ao carregar agendamentos.");
      } finally {
        setCarregando(false);
      }
    }
    carregarAgendamentos();
  }, [httpGet, diasDaSemana]);

  function obterAgendamento(dia: Date, hora: string) {
    const data = dia.toISOString().slice(0, 10);
    return agendamentos.find((ag) => ag.data === data && ag.hora === hora);
  }

  function abrirModal(dia: Date, hora: string) {
    const ag = obterAgendamento(dia, hora);
    setDiaSelecionado(dia);
    setHoraSelecionada(hora);
    setNomeCliente(ag?.cliente?.nome ?? "");
    setDuracao(ag?.duracao ?? 30);
    setIdAgendamento(ag?.id ?? null);
    setModalAberto(true);
  }

  async function salvarAgendamento() {
    if (!diaSelecionado || !horaSelecionada || !nomeCliente) {
      toast.error("Preencha todos os campos!");
      return;
    }

    setSalvando(true);

    const payload = {
      data: diaSelecionado.toISOString().slice(0, 10),
      hora: horaSelecionada,
      duracao,
      cliente_nome: nomeCliente,
    };

    try {
      if (idAgendamento) {
        await httpPut(`/agendamentos/${idAgendamento}/`, payload);
        toast.success("Agendamento atualizado com sucesso");
      } else {
        await httpPost(`/agendamentos/`, payload);
        toast.success("Agendamento criado com sucesso");
      }

      setModalAberto(false);
      setIdAgendamento(null);
      setNomeCliente("");
      setDuracao(30);

      const inicio = diasDaSemana[0].toISOString().slice(0, 10);
      const fim = diasDaSemana[6].toISOString().slice(0, 10);
      const dados = await httpGet(`/agendamentos?inicio=${inicio}&fim=${fim}`);
      setAgendamentos(dados);
    } catch (err) {
      toast.error("Erro ao salvar agendamento");
      console.error(err);
    } finally {
      setSalvando(false);
    }
  }

  async function cancelarAgendamento() {
    if (!idAgendamento) return;

    try {
      setSalvando(true);
      await httpDelete(`/agendamentos/${idAgendamento}/`);
      toast.success("Agendamento cancelado com sucesso");

      setModalAberto(false);
      setIdAgendamento(null);
      setNomeCliente("");
      setDuracao(30);

      const inicio = diasDaSemana[0].toISOString().slice(0, 10);
      const fim = diasDaSemana[6].toISOString().slice(0, 10);
      const dados = await httpGet(`/agendamentos?inicio=${inicio}&fim=${fim}`);
      setAgendamentos(dados);
    } catch (err) {
      toast.error("Erro ao cancelar agendamento");
      console.error(err);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="overflow-auto max-w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Agenda Semanal</h1>

      {carregando ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : erro ? (
        <p className="text-red-600 text-center">{erro}</p>
      ) : (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-left">Horário</th>
              {diasDaSemana.map((dia, i) => (
                <th key={i} className="border px-2 py-1 text-center capitalize">
                  {new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(dia)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horarios.map((hora, i) => (
              <tr key={i}>
                <td className="border px-2 py-1 text-sm font-medium">{hora}</td>
                {diasDaSemana.map((dia, j) => {
                  const agendamento = obterAgendamento(dia, hora);
                  return (
                    <td
                      key={j}
                      className={`border h-10 text-sm text-center cursor-pointer transition duration-200 ${
                        agendamento ? "bg-green-200 hover:bg-green-300" : "hover:bg-gray-100"
                      }`}
                      onClick={() => abrirModal(dia, hora)}
                    >
                      {agendamento?.cliente?.nome || ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
