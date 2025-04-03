import Image from "next/image";
import Profissional1 from "/public/img/profissional-1.png";

export default function SessaoProfissional() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-[var(--bg-primary)]">
      <Image src={Profissional1} alt="Profissional" width={200} height={200} className="rounded-lg" />
      <div>
        <h1 className="text-4xl font-bold text-center text-[var(--color-text)]">Profissional</h1>
        <h2>Fernanda Telles</h2>
        <p className="mt-4 text-lg text-center text-[var(--color-text)]">
          Aqui você pode encontrar informações sobre o profissional.
        </p>
      </div>
    </div>
  );
}
