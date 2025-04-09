export default interface Usuario {
  id?: number;
  nome: string;
  email: string;
  password?: string;
  cpf: string;
  endereco?: string;
  telefone?: string;
  manicure?: boolean;
}
