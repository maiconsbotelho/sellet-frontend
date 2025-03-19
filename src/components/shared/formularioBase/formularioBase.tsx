import { ReactNode } from "react";

interface FormularioBaseProps {
  titulo: string;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
}

const FormularioBase = ({ titulo, onSubmit, children }: FormularioBaseProps) => {
  return (
    <div>
      <h2>{titulo}</h2>
      <form onSubmit={onSubmit}>
        {children}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormularioBase;
