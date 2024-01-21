import { Navbar } from "@/components";
import { FC, ReactElement } from "react";

export const Home: FC = (): ReactElement => {
  return (
    <main className="font-inter flex h-[120vh] w-full flex-col">
      <section className="container w-full">
        <Navbar />
        Home
      </section>
    </main>
  );
};
