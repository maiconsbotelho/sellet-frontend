import Logo from "@/components/navBar/logo";
import Image from "next/image";
import { FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import LogoLL from "/public/img/logoLL.png";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] h-full py-8 px-4">
      <div className="mx-auto flex  items-start justify-between">
        <Image src={LogoLL} alt="Logo" className="w-[91px] " />

        <div className="flex flex-col mt-3 items-start gap-2">
          <div className="flex items-center gap-2">
            <FaInstagram size={24} className="text-[var(--text-secondary)]" />
            <a
              href="https://www.instagram.com/sellet_esmalteria"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              @sellet_esmalteria
            </a>
          </div>

          <div className="flex items-center gap-2">
            <FaWhatsapp size={24} className="text-[var(--text-secondary)]" />
            <a
              href="https://wa.me/5551999484099"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              (51) 99948.4099
            </a>
          </div>
        </div>
      </div>
      <div className="text-[var(--text-secondary)] flex flex-col justify-center items-center text-sm mt-6">
        <p>&copy; {new Date().getFullYear()} Sellet. Todos os direitos reservados.</p>
        <p>created by{" Maicon Botelho"}</p>
      </div>
    </footer>
  );
}
