import { SideBar } from "@/components";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen w-full">
      <SideBar />
      <section className="h-full w-[80%]">{children}</section>
    </main>
  );
};
