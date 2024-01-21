import { FC, ReactElement } from "react";

export const Crash: FC = (): ReactElement => {
  return (
    <main className="container flex h-dvh w-screen flex-col items-center justify-center md:h-screen md:flex-row">
      <img
        src="illustration/internship-bro.png"
        alt="error"
        className="w-1/2 lg:w-1/3 xl:w-1/3"
      />
      <section className="flex flex-col items-center font-bold xl:items-start">
        <h1 className="text-[5rem]">Oops!</h1>
        <p className="text-xl text-rose-400">Something went wrong</p>
        <p className="font-normal">Don't worry, our team is here to help</p>
      </section>
    </main>
  );
};
