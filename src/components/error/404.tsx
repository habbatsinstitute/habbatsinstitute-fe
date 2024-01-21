import { FC, ReactElement } from "react";

export const NotFound: FC = (): ReactElement => {
  return (
    <main className="container flex h-dvh w-screen items-center justify-center gap-3 md:h-screen md:flex-row">
      <p className="text-lg">404</p>
      <hr className="h-[7%] w-[1px] bg-slate-500 md:h-[5%] lg:h-[3%]" />
      <p className="text-lg">This page could not be found.</p>
    </main>
  );
};
