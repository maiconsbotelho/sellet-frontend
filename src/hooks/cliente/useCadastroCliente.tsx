import { useState } from "react";
import { cadastroCliente } from "@/interface_ws/endpoints/cliente/cadastroCliente";

interface ClienteData {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
}

const useCadastroCliente = () => {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const cadastrar = async (formData: ClienteData): Promise<boolean> => {
    setCarregando(true);
    setErro("");
    setSucesso(false);
    const abortController = new AbortController();

    try {
      const resultado = await cadastroCliente(abortController, formData);

      if (resultado.temErro) {
        setErro(resultado.MSG);
        return false; // Retorna false em caso de erro
      } else {
        setSucesso(true);
        return true; // Retorna true em caso de sucesso
      }
    } catch (error) {
      setErro("Erro ao cadastrar cliente.");
      return false; // Retorna false em caso de exceção
    } finally {
      setCarregando(false);
    }
  };

  return { cadastrar, erro, sucesso, carregando };
};

export default useCadastroCliente;
