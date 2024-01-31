import { FC, ReactElement } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const Loader: FC = (): ReactElement => {
  return (
    <main className="flex h-[10dvh] w-screen flex-col items-center justify-center gap-2 sm:h-screen">
      <img src="/logos/black.png" alt="logo" className="my-5 w-24" />
      <div className="flex w-full items-center justify-center gap-3">
        <p className="text-lg">Preparing...</p>
        <AiOutlineLoading className="animate-spin" />
      </div>
      <p>Please wait, we're preparing your request.</p>
    </main>
  );
};
