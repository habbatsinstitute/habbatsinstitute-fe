import { FC, ReactElement } from "react";
import { AboutUsHeader } from "./about-us-header";
import { AboutUsBody } from "./about-us-body";
import { AboutUsFooter } from "./about-us-footer";

export const AboutUs: FC = (): ReactElement => {
  return (
    <main className="relative flex h-[3750px] w-full flex-col font-inter">
      <AboutUsHeader />
      <AboutUsBody />
      <AboutUsFooter />
    </main>
  );
};
