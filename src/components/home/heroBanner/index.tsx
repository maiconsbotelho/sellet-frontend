import Image from "next/image";
import Banner from "/public/img/hero-banner.png";

export default function HeroBanner() {
  return (
    <div className="h-[336px] sm:h-full">
      <Image src={Banner} alt="Hero Banner" className="w-full h-full sm:h-auto object-cover" />
    </div>
  );
}
