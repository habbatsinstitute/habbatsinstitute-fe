import { Navbar } from "@/components";
import { FC, ReactElement } from "react";

export const Home: FC = (): ReactElement => {
  return (
    <main className="flex h-[120vh] w-full flex-col font-inter">
      <Navbar />
      Home
    </main>
  );
};
