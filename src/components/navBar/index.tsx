import Menu from "./menu";
import Logo from "./logo";

export default function NavBar() {
  return (
    <div className="flex justify-between w-screen h-[70px] items-center p-4 bg-[var(--primary-color)] text-white">
      <Menu />
      <Logo />
    </div>
  );
}
