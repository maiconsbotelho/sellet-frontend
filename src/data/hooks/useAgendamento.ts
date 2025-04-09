import { useContext } from "react";
import ContextoAgendamento from "../contexts/ContextoAgendamento";
import { useCallback, useEffect, useState } from "react";
import useAPI from "../../interface_ws/apiClient";
import { Agendamento } from "@/core";

// const useAgendamento = () => useContext(ContextoAgendamento)
// export default useAgendamento

export default function useAgendamentos() {
  const { httpGet } = useAPI();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const carregarAgendamentos = useCallback(
    async function () {
      const agendamentos = await httpGet("/agendamento");
      setAgendamentos(agendamentos);
    },
    [httpGet]
  );

  useEffect(() => {
    carregarAgendamentos();
  }, [carregarAgendamentos]);

  return {
    agendamentos,
  };
}
