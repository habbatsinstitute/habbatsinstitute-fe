import { Footer, Navbar } from "@/components";
import { FC, ReactElement } from "react";
import { CardLogin, ImgLogin } from ".";

export const Login: FC = (): ReactElement => {
  return (
    <main className="flex h-[130vh] w-full flex-col bg-[url('/background/green.png')] font-inter">
      <section className="container h-[70%] w-full">
        <Navbar />
        <section className="flex h-[85%] w-full">
          <CardLogin />
          <ImgLogin />
        </section>
      </section>
      <Footer />
    </main>
  );
};
