interface MensagemProps {
  texto: string;
  tipo: "erro" | "sucesso";
}

const Mensagem = ({ texto, tipo }: MensagemProps) => {
  return <p style={{ color: tipo === "erro" ? "red" : "green" }}>{texto}</p>;
};

export default Mensagem;
