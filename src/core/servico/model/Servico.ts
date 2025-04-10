export default interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number; // Duração do serviço em minutos
  qtdeSlots: number; // Quantidade de slots disponíveis
  imagemURL?: string; // URL da imagem do serviço
  profissionais?: number[]; // IDs dos profissionais vinculados ao serviço
}
