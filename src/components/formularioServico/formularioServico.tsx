import React, { useState } from "react";
import Servico from "@/core/servico/model/Servico";

interface ServicoFormProps {
  onSubmit: (servico: Servico) => void;
}

export default function FormularioServico({ onSubmit }: ServicoFormProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [duracao, setDuracao] = useState(0);
  const [preco, setPreco] = useState(0);
  const [qtdeSlots, setQtdeSlots] = useState(1);
  const [imagemURL, setImagemURL] = useState("");

  const handleSubmit = () => {
    const novoServico: Servico = {
      id: 0, // Será gerado pelo backend
      nome,
      descricao,
      duracao,
      preco,
      qtdeSlots,
      imagemURL,
    };
    onSubmit(novoServico);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <input
        type="number"
        placeholder="Duração (minutos)"
        value={duracao}
        onChange={(e) => setDuracao(Number(e.target.value))}
      />
      <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
      <input
        type="number"
        placeholder="Quantidade de Slots"
        value={qtdeSlots}
        onChange={(e) => setQtdeSlots(Number(e.target.value))}
      />
      <input type="text" placeholder="URL da Imagem" value={imagemURL} onChange={(e) => setImagemURL(e.target.value)} />
      <button type="submit">Salvar</button>
    </form>
  );
}
