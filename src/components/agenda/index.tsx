// "use client";

// import { useState, useMemo } from "react";
// import { format, startOfWeek } from "date-fns";

// type Agendamento = {
//   id: number;
//   cliente: string;
//   horario: string;
//   data: string;
// };

// const getWeekDays = (date: Date): Date[] => {
//   const start = startOfWeek(date, { weekStartsOn: 0 });
//   return Array.from({ length: 7 }, (_, i) => new Date(start.getTime() + i * 86400000));
// };

// const ToggleViewButton = ({
//   view,
//   setView,
// }: {
//   view: "day" | "week";
//   setView: React.Dispatch<React.SetStateAction<"day" | "week">>;
// }) => (
//   <button
//     onClick={() => setView(view === "day" ? "week" : "day")}
//     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//     aria-label="Alternar visualização"
//   >
//     {view === "day" ? "Ver Semana" : "Ver Dia"}
//   </button>
// );

// const AgendamentoList = ({ agendamentos }: { agendamentos: Agendamento[] }) => (
//   <ul>
//     {agendamentos.length > 0 ? (
//       agendamentos.map((agendamento) => (
//         <li key={agendamento.id} className="p-3 border-b">
//           <span className="font-semibold">{agendamento.cliente}</span> - {agendamento.horario}
//         </li>
//       ))
//     ) : (
//       <p className="text-black">Nenhum agendamento encontrado.</p>
//     )}
//   </ul>
// );

// export default function Agenda() {
//   const [view, setView] = useState<"day" | "week">("week");
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const weekDays = useMemo(() => getWeekDays(selectedDate), [selectedDate]);

//   const agendamentos: Agendamento[] = [
//     { id: 1, cliente: "Maria", horario: "10:00", data: "2025-03-24" },
//     { id: 2, cliente: "João", horario: "14:00", data: "2025-03-24" },
//   ];

//   const filteredAgendamentos = useMemo(
//     () => agendamentos.filter((a) => a.data === format(selectedDate, "yyyy-MM-dd")),
//     [selectedDate, agendamentos]
//   );

//   return (
//     <div className="p-6 max-w-2xl mx-auto text-black bg-white shadow-lg rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="date"
//           value={format(selectedDate, "yyyy-MM-dd")}
//           onChange={(e) => setSelectedDate(new Date(e.target.value))}
//           className="p-2 border border-gray-300 rounded-lg"
//           aria-label="Selecionar data"
//         />
//         <ToggleViewButton view={view} setView={setView} />
//       </div>

//       <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
//         {weekDays.map((day) => (
//           <button
//             key={day.toISOString()}
//             onClick={() => setSelectedDate(day)}
//             className={`p-2 border rounded-lg bg-gray-100  ${
//               format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
//                 ? "bg-blue-500 text-black"
//                 : "bg-green-500"
//             }`}
//           >
//             {format(day, "dd/MM")}
//           </button>
//         ))}
//       </div>

//       <AgendamentoList agendamentos={filteredAgendamentos} />
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useMemo } from "react";
import { format, startOfWeek } from "date-fns";

type Agendamento = {
  id: number;
  cliente: string;
  horario: string;
  data: string;
};

const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 7 }, (_, i) => new Date(start.getTime() + i * 86400000));
};

const ToggleViewButton = ({
  view,
  setView,
}: {
  view: "day" | "week";
  setView: React.Dispatch<React.SetStateAction<"day" | "week">>;
}) => (
  <button
    onClick={() => setView(view === "day" ? "week" : "day")}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    aria-label="Alternar visualização"
  >
    {view === "day" ? "Ver Semana" : "Ver Dia"}
  </button>
);

const AgendamentoList = ({ agendamentos }: { agendamentos: Agendamento[] }) => (
  <ul>
    {agendamentos.length > 0 ? (
      agendamentos.map((agendamento) => (
        <li key={agendamento.id} className="p-3 border-b">
          <span className="font-semibold">{agendamento.cliente}</span> - {agendamento.horario}
        </li>
      ))
    ) : (
      <p className="text-black">Nenhum agendamento encontrado.</p>
    )}
  </ul>
);

export default function Agenda() {
  const [view, setView] = useState<"day" | "week">("week");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    // Função para buscar os agendamentos da API
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch("/data/agendamentos.json"); // Substituir pela URL correta da API
        const data: Agendamento[] = await response.json();
        setAgendamentos(data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAgendamentos();
  }, []);

  const weekDays = useMemo(() => getWeekDays(selectedDate), [selectedDate]);

  const filteredAgendamentos = useMemo(
    () => agendamentos.filter((a) => a.data === format(selectedDate, "yyyy-MM-dd")),
    [selectedDate, agendamentos]
  );

  return (
    <div className="p-6 max-w-2xl mx-auto text-black bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <input
          type="date"
          value={format(selectedDate, "yyyy-MM-dd")}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="p-2 border border-gray-300 rounded-lg"
          aria-label="Selecionar data"
        />
        <ToggleViewButton view={view} setView={setView} />
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
        {weekDays.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => setSelectedDate(day)}
            className={`p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 ${
              format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") ? "bg-blue-500 text-white" : ""
            }`}
          >
            {format(day, "dd/MM")}
          </button>
        ))}
      </div>

      <AgendamentoList agendamentos={filteredAgendamentos} />
    </div>
  );
}
