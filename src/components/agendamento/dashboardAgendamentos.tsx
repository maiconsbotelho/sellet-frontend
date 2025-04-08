"use client";

import { useEffect, useMemo, useState } from "react";
import useAPI from "@/data/hooks/useAPI";
import useSessao from "@/data/hooks/useSessao";
import DateUtils from "@/core/utils/DateUtils";
import { toast } from "sonner";

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
  const { usuario } = useSessao();

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

  const semanaAtual = useMemo(() => {
    const hoje = new Date();
    const inicio = DateUtils.inicioDaSemana(hoje);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(inicio);
      d.setDate(inicio.getDate() + i);
      return d;
    });
  }, []);

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
      setCarregando(true);
      setErro(null);
      try {
        const inicioSemana = semanaAtual[0].toISOString().slice(0, 10);
        const fimSemana = semanaAtual[6].toISOString().slice(0, 10);
        const dados = await httpGet(`/agendamentos?inicio=${inicioSemana}&fim=${fimSemana}`);
        setAgendamentos(dados);
      } catch (err) {
        console.error("Erro ao carregar agendamentos:", err);
        setErro("Erro ao carregar agendamentos.");
      } finally {
        setCarregando(false);
      }
    }
    carregarAgendamentos();
  }, [httpGet, semanaAtual]);

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

      const inicio = semanaAtual[0].toISOString().slice(0, 10);
      const fim = semanaAtual[6].toISOString().slice(0, 10);
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

      const inicio = semanaAtual[0].toISOString().slice(0, 10);
      const fim = semanaAtual[6].toISOString().slice(0, 10);
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
              {semanaAtual.map((dia, i) => (
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
                {semanaAtual.map((dia, j) => {
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

      {modalAberto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">{idAgendamento ? "Editar Agendamento" : "Novo Agendamento"}</h2>

            <p className="mb-2 text-sm">
              Data: <strong>{diaSelecionado?.toLocaleDateString()}</strong>
            </p>
            <p className="mb-4 text-sm">
              Hora: <strong>{horaSelecionada}</strong>
            </p>

            <input
              type="text"
              className="input mb-3 w-full"
              placeholder="Nome do cliente"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
            />

            <input
              type="number"
              className="input mb-3 w-full"
              placeholder="Duração (min)"
              value={duracao}
              onChange={(e) => setDuracao(Number(e.target.value))}
            />

            <div className="flex justify-between items-center mt-4">
              {idAgendamento && (
                <button onClick={cancelarAgendamento} className="button bg-red-600 text-white">
                  Cancelar Agendamento
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button onClick={() => setModalAberto(false)} className="button-outline">
                  Fechar
                </button>
                <button
                  onClick={salvarAgendamento}
                  className={`button bg-green-600 text-white ${salvando ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={salvando}
                >
                  {salvando ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
