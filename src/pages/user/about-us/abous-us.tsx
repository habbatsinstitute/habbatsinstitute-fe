import { Navbar } from "@/components";
import { FC, ReactElement } from "react";
import { Team, Visi } from ".";

export const AboutUs: FC = (): ReactElement => {
  return (
    <main className="flex h-[3700px] w-full flex-col font-inter">
      <Navbar />
      <Visi />
      <Team />
    </main>
  );
};
