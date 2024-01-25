import { FC, ReactElement } from "react";
import { NewsBody } from "./news-body";
import { NewsFooter } from "./news-footer";
import { NewsHeader } from "./news-header";

export const News: FC = (): ReactElement => {
  return (
    <main className="relative flex h-[3000px] w-full flex-col font-inter">
      <NewsHeader />
      <NewsBody />
      <NewsFooter />
    </main>
  );
};
