export default interface Usuario {
  id?: number;
  foto_perfil?: string;
  first_name: string; // Nome
  last_name: string; // Sobrenome
  email: string;
  password?: string;
  cpf?: string;
  telefone?: string;
  data_nascimento?: string;
  endereco?: string;
  cep?: string;
  uf?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  tipo_usuario?: "cliente" | "profissional" | "administrador";
}
