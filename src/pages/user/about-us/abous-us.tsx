import { Footer, Navbar, Trend } from "@/components";
import { FC, ReactElement } from "react";
import { Team, Visi } from ".";

export const AboutUs: FC = (): ReactElement => {
  return (
    <main className="relative flex h-[3750px] w-full flex-col font-inter">
      <Navbar />
      <Visi />
      <Team />
      <Trend />
      <Footer />
    </main>
  );
};
