import { Navbar } from "@/components";
import { FC, ReactElement } from "react";

export const Login: FC = (): ReactElement => {
  return (
    <main className="font-inter flex h-[120vh] w-full flex-col bg-[url('/background/green.png')]">
      <section className="container w-full">
        <Navbar />
      </section>
    </main>
  );
};
