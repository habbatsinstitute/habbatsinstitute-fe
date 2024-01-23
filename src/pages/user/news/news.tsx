import { Footer, Navbar, Trend } from "@/components";
import { FC, ReactElement } from "react";
import { AllNews, Consultant, Header } from ".";

export const News: FC = (): ReactElement => {
  return (
    <main className="relative flex h-[3000px] w-full flex-col font-inter">
      <Navbar />
      <Header />
      <Trend />
      <AllNews />
      <Consultant />
      <Footer />
    </main>
  );
};
