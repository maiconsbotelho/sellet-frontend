import Nav from "@/components/ui/nav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      {children}
      <Nav />
    </div>
  );
}
