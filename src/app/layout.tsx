import Header from "@/components/ui/header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "./providers";
import NavBar from "@/components/navBar";
import { Inter } from "next/font/google";
import { ProvedorSessao } from "@/data/contexts/ContextoSessao";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Séllet Esmalteria",
  description: "Onde sua beleza é nossa prioridade!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Determinar a franquia com base na URL sem recriar o header

  return (
    <html lang="pt-BR">
      <body>
        <ContextProvider>
          <ProvedorSessao>
            <div>
              {/* <NavBar /> */}

              {children}
            </div>
          </ProvedorSessao>
        </ContextProvider>
      </body>
    </html>
  );
}
