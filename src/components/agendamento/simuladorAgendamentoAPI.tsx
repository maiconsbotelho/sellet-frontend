"use client";

import React, { useEffect, useState } from "react";

type Agendamento = {
  id: number;
  profissional: string;
  servico: string;
  duracao: number;
  data: string;
  hora: string;
  cliente: string;
};

type ViewMode = "dia" | "semana";

const horarios = Array.from({ length: 28 }, (_, i) => {
  const hora = 8 + Math.floor(i / 2);
  const minuto = i % 2 === 0 ? "00" : "30";
  return `${hora.toString().padStart(2, "0")}:${minuto}`;
});

const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function SimuladorAgendamento() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("dia");
  const [diaAtual, setDiaAtual] = useState(new Date().toISOString().slice(0, 10));
  const [modalInfo, setModalInfo] = useState<{
    horario: string;
    dia: string;
    agendamento?: Agendamento;
  } | null>(null);
  const [formData, setFormData] = useState({
    cliente: "",
    servico: "",
    duracao: 30,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/agendamentos/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAgendamentos(data))
      .catch((err) => console.error("Erro ao buscar agendamentos:", err));
  }, [token]);

  function salvarAgendamento() {
    if (!modalInfo) return;
    const payload = {
      ...formData,
      data: modalInfo.dia,
      hora: modalInfo.horario,
      profissional: "Ana Souza", // fixo por enquanto
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (modalInfo.agendamento) {
      // Editar
      fetch(`/api/agendamentos/${modalInfo.agendamento.id}/`, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          setAgendamentos((prev) => prev.map((a) => (a.id === data.id ? data : a)));
          setModalInfo(null);
        });
    } else {
      // Criar novo
      fetch("/api/agendamentos/", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          setAgendamentos((prev) => [...prev, data]);
          setModalInfo(null);
        });
    }
  }

  function excluirAgendamento(id: number) {
    fetch(`/api/agendamentos/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setAgendamentos((prev) => prev.filter((a) => a.id !== id));
      setModalInfo(null);
    });
  }

  function getAgendaDia(dia: string) {
    return horarios.map((horario) => {
      const agendamento = agendamentos.find((a) => a.data === dia && a.hora === horario);
      return (
        <tr key={horario}>
          <td className="border p-2 w-24 text-sm">{horario}</td>
          <td
            className={`border p-2 cursor-pointer ${agendamento ? "bg-green-200" : "bg-white"}`}
            onClick={() => setModalInfo({ horario, dia, agendamento: agendamento || undefined })}
          >
            {agendamento ? agendamento.cliente : ""}
          </td>
        </tr>
      );
    });
  }

  function getAgendaSemana() {
    const hoje = new Date(diaAtual);
    const semana = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(hoje);
      d.setDate(d.getDate() + i);
      return d.toISOString().slice(0, 10);
    });

    return (
      <>
        <thead>
          <tr>
            <th className="border p-2 w-24 text-sm">Hora</th>
            {semana.map((dia, i) => (
              <th key={dia} className="border p-2 text-sm">
                {diasDaSemana[i]}
                <br />
                {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario}>
              <td className="border p-2 w-24 text-sm">{horario}</td>
              {semana.map((dia) => {
                const agendamento = agendamentos.find((a) => a.data === dia && a.hora === horario);
                return (
                  <td
                    key={dia + horario}
                    className={`border p-2 text-sm cursor-pointer ${agendamento ? "bg-green-200" : "bg-white"}`}
                    onClick={() => setModalInfo({ horario, dia, agendamento: agendamento || undefined })}
                  >
                    {agendamento ? agendamento.cliente : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <button
          className={`px-4 py-2 rounded ${viewMode === "dia" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setViewMode("dia")}
        >
          Dia
        </button>
        <button
          className={`px-4 py-2 rounded ${viewMode === "semana" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setViewMode("semana")}
        >
          Semana
        </button>
      </div>

      <table className="border-collapse w-full text-sm">
        {viewMode === "dia" ? (
          <thead>
            <tr>
              <th className="border p-2">Hora</th>
              <th className="border p-2">{diaAtual}</th>
            </tr>
          </thead>
        ) : null}
        <tbody>{viewMode === "dia" ? getAgendaDia(diaAtual) : getAgendaSemana()}</tbody>
      </table>

      {/* Modal */}
      {modalInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-lg space-y-4 w-[300px]">
            <h2 className="text-lg font-bold">{modalInfo.agendamento ? "Editar" : "Novo"} Agendamento</h2>
            <div>
              <label className="block text-sm">Cliente:</label>
              <input
                type="text"
                value={formData.cliente}
                onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                className="border p-1 w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-sm">Serviço:</label>
              <input
                type="text"
                value={formData.servico}
                onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
                className="border p-1 w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-sm">Duração:</label>
              <select
                value={formData.duracao}
                onChange={(e) => setFormData({ ...formData, duracao: parseInt(e.target.value) })}
                className="border p-1 w-full text-sm"
              >
                {[30, 60, 90, 120].map((d) => (
                  <option key={d} value={d}>
                    {d} min
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              {modalInfo.agendamento && (
                <button
                  onClick={() => excluirAgendamento(modalInfo.agendamento!.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Excluir
                </button>
              )}
              <button onClick={salvarAgendamento} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                Salvar
              </button>
              <button onClick={() => setModalInfo(null)} className="border px-3 py-1 rounded text-sm">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
