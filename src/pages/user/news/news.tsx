import { Footer, Navbar, Trend } from "@/components";
import { FC, ReactElement } from "react";
import { AllNews, Consultant, NewsHeader } from ".";

export const News: FC = (): ReactElement => {
  return (
    <main className="relative flex h-[3000px] w-full flex-col font-inter">
      <Navbar />
      <NewsHeader />
      <Trend />
      <AllNews />
      <Consultant />
      <Footer />
    </main>
  );
};
