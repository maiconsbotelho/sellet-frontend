import Usuario from "../../usuario/model/Usuario";
import Servico from "../../servico/model/Servico";

export default interface Agendamento {
  id: number;
  data: Date;
  cliente: Usuario;
  profissional: Usuario; // Profissional é tratado como um usuário
  servicos: Servico[];
  status: "pendente" | "confirmado" | "cancelado";
}
