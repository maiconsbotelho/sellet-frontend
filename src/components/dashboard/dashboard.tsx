// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { format, startOfWeek } from "date-fns";

// // Tipagem dos agendamentos
// type Agendamento = {
//   id: number;
//   cliente: string;
//   horario: string;
//   data: string;
// };

// // Tipagem das estatísticas
// interface Estatisticas {
//   total: number;
//   maisAgendado: string;
//   profissionalTop: string;
// }

// const getWeekDays = (date: Date): Date[] => {
//   const start = startOfWeek(date, { weekStartsOn: 0 });
//   return Array.from({ length: 7 }, (_, i) => new Date(start.getTime() + i * 86400000));
// };

// // Componente para alternar entre visualizações de dia e semana
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

// // Componente que lista os agendamentos
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

// export default function Dashboard() {
//   const [view, setView] = useState<"day" | "week">("week");
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
//   const [estatisticas, setEstatisticas] = useState<Estatisticas>({
//     total: 0,
//     maisAgendado: "",
//     profissionalTop: "",
//   });

//   useEffect(() => {
//     // Função para buscar os agendamentos da API
//     const fetchAgendamentos = async () => {
//       try {
//         const response = await fetch("/src/data/agendamentos.json"); // Caminho correto para o arquivo agendamentos.json
//         const data: Agendamento[] = await response.json();
//         setAgendamentos(data);
//       } catch (error) {
//         console.error("Erro ao buscar agendamentos:", error);
//       }
//     };

//     // Função para buscar as estatísticas da API
//     const fetchEstatisticas = async () => {
//       try {
//         const response = await fetch("/src/data/estatisticas.json"); // Caminho correto para o arquivo estatisticas.json
//         const data = await response.json();
//         setEstatisticas({
//           total: data.estatisticas.totalAgendamentos,
//           maisAgendado: data.estatisticas.maisAgendado,
//           profissionalTop: data.estatisticas.profissionalTop,
//         });
//       } catch (error) {
//         console.error("Erro ao buscar estatísticas:", error);
//       }
//     };

//     fetchAgendamentos();
//     fetchEstatisticas();
//   }, []);

//   const weekDays = useMemo(() => getWeekDays(selectedDate), [selectedDate]);

//   // Filtrando os agendamentos com base na data selecionada (dia ou semana)
//   const filteredAgendamentos = useMemo(
//     () =>
//       view === "week"
//         ? agendamentos.filter((a) =>
//             weekDays.some((day) => format(new Date(a.data), "yyyy-MM-dd") === format(day, "yyyy-MM-dd"))
//           )
//         : agendamentos.filter((a) => a.data === format(selectedDate, "yyyy-MM-dd")),
//     [selectedDate, agendamentos, view, weekDays]
//   );

//   return (
//     <div className="p-6 max-w-2xl mx-auto text-black bg-white shadow-lg rounded-lg">
//       {/* Dashboard de Estatísticas */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         <div className="p-4 bg-gray-100 rounded-lg shadow">
//           <h2 className="text-lg font-semibold">Total de Agendamentos</h2>
//           <p className="text-2xl">{estatisticas.total}</p>
//         </div>
//         <div className="p-4 bg-gray-100 rounded-lg shadow">
//           <h2 className="text-lg font-semibold">Serviço Mais Agendado</h2>
//           <p className="text-xl">{estatisticas.maisAgendado || "Nenhum dado"}</p>
//         </div>
//         <div className="p-4 bg-gray-100 rounded-lg shadow">
//           <h2 className="text-lg font-semibold">Profissional Mais Requisitado</h2>
//           <p className="text-xl">{estatisticas.profissionalTop || "Nenhum dado"}</p>
//         </div>
//       </div>

//       {/* Seção de Agendamentos */}
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <input
//             type="date"
//             value={format(selectedDate, "yyyy-MM-dd")}
//             onChange={(e) => setSelectedDate(new Date(e.target.value))}
//             className="p-2 border border-gray-300 rounded-lg"
//             aria-label="Selecionar data"
//           />
//           <ToggleViewButton view={view} setView={setView} />
//         </div>

//         {view === "week" && (
//           <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
//             {weekDays.map((day) => (
//               <button
//                 key={day.toISOString()}
//                 onClick={() => setSelectedDate(day)}
//                 className={`p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 ${
//                   format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") ? "bg-blue-500 text-white" : ""
//                 }`}
//               >
//                 {format(day, "dd/MM")}
//               </button>
//             ))}
//           </div>
//         )}

//         <AgendamentoList agendamentos={filteredAgendamentos} />
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useMemo } from "react";
import { format, startOfWeek } from "date-fns";
import agendamentosData from "../../data/agendamentos.json";
import estatisticasData from "../../data/estatisticas.json";

// Tipagem dos agendamentos
type Agendamento = {
  id: number;
  cliente: string;
  horario: string;
  data: string;
  servico: string;
  profissional: string;
};

// Tipagem das estatísticas
interface Estatisticas {
  total: number;
  maisAgendado: string;
  profissionalTop: string;
}

const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  return Array.from({ length: 7 }, (_, i) => new Date(start.getTime() + i * 86400000));
};

// Função para normalizar a data e evitar problemas com fuso horário
const normalizeDate = (date: Date): Date => {
  const localDate = new Date(date);
  localDate.setHours(0, 0, 0, 0); // Configura a hora para 00:00:00 no horário local
  return localDate;
};

// Componente para alternar entre visualizações de dia e semana
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

// Componente que lista os agendamentos
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

export default function Dashboard() {
  const [view, setView] = useState<"day" | "week">("week");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Acessando os dados de agendamentos e estatísticas dos arquivos JSON
  const agendamentos: Agendamento[] = agendamentosData.agendamentos; // Acessando a chave 'agendamentos'
  const estatisticas: Estatisticas = {
    total: estatisticasData.estatisticas.totalAgendamentos,
    maisAgendado: estatisticasData.estatisticas.maisAgendado,
    profissionalTop: estatisticasData.estatisticas.profissionalTop,
  };

  const weekDays = useMemo(() => getWeekDays(selectedDate), [selectedDate]);

  // Filtrando os agendamentos com base na data selecionada (dia ou semana)
  const filteredAgendamentos = useMemo(
    () => agendamentos.filter((a) => a.data === format(selectedDate, "yyyy-MM-dd")),
    [selectedDate, agendamentos]
  );

  // Função para lidar com a seleção de um dia da semana
  const handleDaySelect = (day: Date) => {
    setSelectedDate(normalizeDate(day)); // Normalizando a data ao selecionar o dia
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-black bg-white shadow-lg rounded-lg">
      {/* Dashboard de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total de Agendamentos</h2>
          <p className="text-2xl">{estatisticas.total}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Serviço Mais Agendado</h2>
          <p className="text-xl">{estatisticas.maisAgendado || "Nenhum dado"}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Profissional Mais Requisitado</h2>
          <p className="text-xl">{estatisticas.profissionalTop || "Nenhum dado"}</p>
        </div>
      </div>

      {/* Seção de Agendamentos */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="date"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => {
              // Em vez de usar new Date() diretamente, garantimos que a data seja interpretada corretamente
              const newDate = new Date(e.target.value + "T00:00:00"); // Para garantir que a hora seja zero
              setSelectedDate(newDate);
            }}
            className="p-2 border border-gray-300 rounded-lg"
            aria-label="Selecionar data"
          />
          <ToggleViewButton view={view} setView={setView} />
        </div>

        {view === "week" && (
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
            {weekDays.map((day) => (
              <button
                key={day.toISOString()}
                onClick={() => handleDaySelect(day)}
                className={`p-2 border rounded-lg bg-gray-100 hover:bg-gray-200 ${
                  format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") ? "bg-blue-500 text-white" : ""
                }`}
              >
                {format(day, "dd/MM")}
              </button>
            ))}
          </div>
        )}

        <AgendamentoList agendamentos={filteredAgendamentos} />
      </div>
    </div>
  );
}
