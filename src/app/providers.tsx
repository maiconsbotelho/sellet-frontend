import { ModalPerfilProvider } from "@/data/contexts/modalPerfilContext";
export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <ModalPerfilProvider>{children}</ModalPerfilProvider>;
};
