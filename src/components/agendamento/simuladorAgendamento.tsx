"use client";

import { useEffect, useState } from "react";
import agendamentosData from "@/data/agendamentos.json";

interface Agendamento {
  profissional: string;
  servico: string;
  duracao: number;
  data: string;
  hora: string;
  cliente: string;
}

interface ModalInfo {
  hora: string;
  cliente: string;
  servico: string;
  duracao: number;
  isEditando: boolean;
  data: string;
}

function gerarHorarios(inicio: number, fim: number): string[] {
  const horarios: string[] = [];
  for (let h = inicio; h <= fim; h++) {
    horarios.push(`${h.toString().padStart(2, "0")}:00`);
    if (h !== fim) horarios.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return horarios;
}

function getSemana() {
  const hoje = new Date();
  const dias: string[] = [];
  for (let i = 0; i < 7; i++) {
    const dia = new Date(hoje);
    dia.setDate(hoje.getDate() + i);
    dias.push(dia.toISOString().split("T")[0]);
  }
  return dias;
}

const horarios = gerarHorarios(8, 22);
const profissionalAtual = "Ana Souza";

export default function Dashboard() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [agenda, setAgenda] = useState<{ [data: string]: { [hora: string]: Agendamento | null } }>({});
  const [modalInfo, setModalInfo] = useState<ModalInfo | null>(null);
  const [modo, setModo] = useState<"dia" | "semana">("dia");

  const hoje = new Date().toISOString().split("T")[0];
  const semana = getSemana();

  useEffect(() => {
    const filtrados = (agendamentosData as Agendamento[]).filter(
      (a) => a.profissional === profissionalAtual && semana.includes(a.data)
    );
    setAgendamentos(filtrados);
  }, []);

  useEffect(() => {
    const novaAgenda: { [data: string]: { [hora: string]: Agendamento | null } } = {};
    semana.forEach((d) => {
      novaAgenda[d] = {};
      horarios.forEach((h) => (novaAgenda[d][h] = null));
    });

    agendamentos.forEach((a) => {
      let atual = a.hora;
      const blocos = a.duracao / 30;
      for (let i = 0; i < blocos; i++) {
        if (i === 0) {
          novaAgenda[a.data][atual] = a;
        } else {
          novaAgenda[a.data][atual] = { ...a, cliente: "" };
        }

        const [h, m] = atual.split(":").map(Number);
        const totalMin = h * 60 + m + 30;
        const newH = Math.floor(totalMin / 60);
        const newM = totalMin % 60;
        atual = `${newH.toString().padStart(2, "0")}:${newM.toString().padStart(2, "0")}`;
      }
    });

    setAgenda(novaAgenda);
  }, [agendamentos]);

  function handleClick(hora: string, data: string) {
    const ag = agenda[data]?.[hora];
    if (ag && ag.cliente) {
      setModalInfo({
        hora,
        data,
        cliente: ag.cliente,
        servico: ag.servico,
        duracao: ag.duracao,
        isEditando: true,
      });
    } else {
      setModalInfo({
        hora,
        data,
        cliente: "",
        servico: "",
        duracao: 30,
        isEditando: false,
      });
    }
  }

  function fecharModal() {
    setModalInfo(null);
  }

  function salvarAgendamento() {
    if (!modalInfo) return;
    const novo: Agendamento = {
      cliente: modalInfo.cliente,
      servico: modalInfo.servico,
      duracao: modalInfo.duracao,
      data: modalInfo.data,
      hora: modalInfo.hora,
      profissional: profissionalAtual,
    };

    const novosAgendamentos = agendamentos.filter((a) => {
      const inicioExistente = toMinutos(a.hora);
      const fimExistente = inicioExistente + a.duracao;
      const inicioNovo = toMinutos(novo.hora);
      const fimNovo = inicioNovo + novo.duracao;
      return a.data !== novo.data || fimExistente <= inicioNovo || inicioExistente >= fimNovo;
    });

    novosAgendamentos.push(novo);
    setAgendamentos(novosAgendamentos);
    fecharModal();
  }

  function excluirAgendamento() {
    if (!modalInfo) return;
    const novos = agendamentos.filter((a) => !(a.data === modalInfo.data && a.hora === modalInfo.hora));
    setAgendamentos(novos);
    fecharModal();
  }

  function toMinutos(horario: string): number {
    const [h, m] = horario.split(":").map(Number);
    return h * 60 + m;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Agenda {modo === "dia" ? "de Hoje" : "da Semana"} - {profissionalAtual}
        </h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setModo(modo === "dia" ? "semana" : "dia")}
        >
          Ver por {modo === "dia" ? "Semana" : "Dia"}
        </button>
      </div>

      <div className="overflow-x-auto">
        {modo === "dia" ? (
          <table className="table-auto border-collapse w-full text-sm max-w-2xl">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">Horário</th>
                <th className="border px-4 py-2 bg-gray-100 text-left">Cliente</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((hora) => {
                const ag = agenda[hoje]?.[hora];
                return (
                  <tr key={hora} onClick={() => handleClick(hora, hoje)} className="cursor-pointer hover:bg-gray-100">
                    <td className="border px-4 py-2 font-medium">{hora}</td>
                    <td className={`border px-4 py-2 ${ag ? "bg-green-100" : "text-gray-400"}`}>
                      {ag?.cliente ? ag.cliente : ag ? "..." : "Vazio"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table className="table-auto border-collapse w-full text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-100 text-left">Horário</th>
                {semana.map((data) => (
                  <th key={data} className="border px-4 py-2 bg-gray-100 text-center">
                    {new Date(data).toLocaleDateString("pt-BR", {
                      weekday: "short",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarios.map((hora) => (
                <tr key={hora}>
                  <td className="border px-4 py-2 font-medium">{hora}</td>
                  {semana.map((data) => {
                    const ag = agenda[data]?.[hora];
                    return (
                      <td
                        key={data + hora}
                        onClick={() => handleClick(hora, data)}
                        className={`border px-2 py-1 cursor-pointer hover:bg-gray-100 text-center ${
                          ag ? "bg-green-100" : "text-gray-400"
                        }`}
                      >
                        {ag?.cliente ? ag.cliente : ag ? "..." : "Vazio"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalInfo && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {modalInfo.isEditando ? "Editar Agendamento" : "Novo Agendamento"} - {modalInfo.hora} ({modalInfo.data})
            </h2>
            <div className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                placeholder="Cliente"
                value={modalInfo.cliente}
                onChange={(e) => setModalInfo({ ...modalInfo, cliente: e.target.value })}
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Serviço"
                value={modalInfo.servico}
                onChange={(e) => setModalInfo({ ...modalInfo, servico: e.target.value })}
              />
              <select
                className="w-full border p-2 rounded"
                value={modalInfo.duracao}
                onChange={(e) => setModalInfo({ ...modalInfo, duracao: parseInt(e.target.value) })}
              >
                <option value={30}>30 minutos</option>
                <option value={60}>60 minutos</option>
                <option value={90}>90 minutos</option>
                <option value={120}>120 minutos</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              {modalInfo.isEditando && (
                <button onClick={excluirAgendamento} className="px-4 py-2 bg-red-500 text-white rounded">
                  Excluir
                </button>
              )}
              <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded">
                Cancelar
              </button>
              <button onClick={salvarAgendamento} className="px-4 py-2 bg-blue-600 text-white rounded">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
