import { Footer, Navbar } from "@/components";
import { FC, ReactElement } from "react";
import { CardLogin, ImgLogin } from ".";

export const Login: FC = (): ReactElement => {
  return (
    <main className="relative flex h-[850px] w-full flex-col bg-[url('/backgrounds/green.png')] font-inter">
      <section className="h-full w-full">
        <Navbar />
        <section className="container flex h-[60%] w-full">
          <CardLogin />
          <ImgLogin />
        </section>
      </section>
      <Footer />
    </main>
  );
};
