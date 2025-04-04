import Slogan from "@/components/landing/Slogan";
import NossosServicos from "@/components/servico/NossosServicos";
import Rodape from "@/components/shared/Rodape";
import SecaoBackground from "@/components/shared/SecaoBackground";
import SecaoSobre from "@/components/sobre/SecaoSobre";

export default function Landing() {
  return (
    <div className="flex flex-col">
      <Slogan />
      <SecaoBackground imagem="/banners/servicos.png">
        <NossosServicos />
      </SecaoBackground>
      {/* <SecaoBackground imagem="/banners/profissionais.webp">
                <NossosProfissionais />
            </SecaoBackground> */}
      <SecaoBackground imagem="/banners/sobre.png">
        <SecaoSobre />
      </SecaoBackground>

      <Rodape />
    </div>
  );
}
