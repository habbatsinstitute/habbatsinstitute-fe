import { Navbar } from "@/components";
import { FC, ReactElement } from "react";
import { NewsDetailBody, NewsDetailHeader } from ".";

export const NewsDetail: FC = (): ReactElement => {
  return (
    <main className="relative flex h-auto w-full flex-col font-inter">
      <Navbar />
      <NewsDetailHeader />
      <NewsDetailBody />
    </main>
  );
};
