import { FC, ReactElement } from "react";
import { NewsDetailHeader } from "./news-detail-header";
import { NewsDetailBody } from "./news-detail-body";

export const NewsDetail: FC = (): ReactElement => {
  return (
    <main className="relative flex h-auto w-full flex-col font-inter">
      <NewsDetailHeader />
      <NewsDetailBody />
    </main>
  );
};
