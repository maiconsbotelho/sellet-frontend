import Nav from "@/components/ui/nav";
import Agenda from "@/components/agenda";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <Agenda />

      <Nav />
    </div>
  );
}
