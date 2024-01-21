import { Navbar } from "@/components";
import { FC, ReactElement } from "react";

export const AboutUs: FC = (): ReactElement => {
  return (
    <main className="font-inter flex h-[120vh] w-full flex-col">
      <section className="container w-full">
        <Navbar />
        AboutUs
      </section>
    </main>
  );
};
