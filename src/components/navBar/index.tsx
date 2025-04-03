import Menu from "./menu";
import Logo from "./logo";

export default function NavBar() {
  return (
    <div className="flex justify-between w-full h-[70px] items-center p-4 bg-[var(--bg-primary)]">
      <Logo />
      <Menu />
    </div>
  );
}
