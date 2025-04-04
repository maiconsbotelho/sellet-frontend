import HeroBanner from "./heroBanner";
import NavBar from "../navBar";
import BoasVindas from "./boasVindas";
import SessaoServicos from "./sessaoServicos";
import SessaoProfissional from "./sessaoProfissional";
import Footer from "./footer";

export default function Home() {
  return (
    <div className="overflow-y-auto">
      <HeroBanner />
      <BoasVindas />
      <SessaoServicos />
      <SessaoProfissional />
      <Footer />
    </div>
  );
}
