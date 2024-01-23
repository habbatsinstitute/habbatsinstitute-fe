import { Navbar } from "@/components";
import { FC, ReactElement } from "react";
import { Body, Header } from ".";

export const NewsDetail: FC = (): ReactElement => {
  return (
    <main className="relative flex h-auto w-full flex-col font-inter">
      <Navbar />
      <Header />
      <Body />
    </main>
  );
};
