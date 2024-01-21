import { Navbar } from "@/components";
import { FC, ReactElement } from "react";

export const AboutUs: FC = (): ReactElement => {
  return (
    <main className="container flex h-[120vh] w-full flex-col font-inter">
      <Navbar />
      About us
    </main>
  );
};
