"use client";
import { useState } from "react";
import { format, startOfWeek } from "date-fns";

export default function Agenda() {
  const [view, setView] = useState("day");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeekDays = (date: Date): Date[] => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => new Date(start.getTime() + i * 86400000));
  };

  const weekDays = getWeekDays(selectedDate);

  const agendamentos = [
    { id: 1, cliente: "Maria", horario: "10:00", data: "2025-03-24" },
    { id: 2, cliente: "João", horario: "14:00", data: "2025-03-24" },
  ];

  const filteredAgendamentos =
    view === "day" ? agendamentos.filter((a) => a.data === format(selectedDate, "yyyy-MM-dd")) : agendamentos;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <input
          type="date"
          value={format(selectedDate, "yyyy-MM-dd")}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={() => setView(view === "day" ? "week" : "day")}
          className="bg-blue-600 text-black px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {view === "day" ? "Ver Semana" : "Ver Dia"}
        </button>
      </div>

      {view === "week" && (
        <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
          {weekDays.map((day) => (
            <div key={day} className="p-2 border rounded-lg bg-gray-100">
              {format(day, "dd/MM")}
            </div>
          ))}
        </div>
      )}

      <ul>
        {filteredAgendamentos.length > 0 ? (
          filteredAgendamentos.map((agendamento) => (
            <li key={agendamento.id} className="p-3 border-b">
              <span className="font-semibold">{agendamento.cliente}</span> - {agendamento.horario}
            </li>
          ))
        ) : (
          <p className="text-gray-500">Nenhum agendamento encontrado.</p>
        )}
      </ul>
    </div>
  );
}
