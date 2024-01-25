import { FC, ReactElement } from "react";
import { HomeHeader } from "./home-header";

export const Home: FC = (): ReactElement => {
  return (
    <main className="relative flex h-[3500px] w-full flex-col overflow-x-hidden font-inter">
      <HomeHeader />
    </main>
  );
};
