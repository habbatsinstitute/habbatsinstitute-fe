import { Navbar } from "@/components";
import { FC, ReactElement } from "react";
import { Visi } from ".";

export const AboutUs: FC = (): ReactElement => {
  return (
    <main className="container flex h-[3700px] w-full flex-col font-inter">
      <Navbar />
      <Visi />
    </main>
  );
};
