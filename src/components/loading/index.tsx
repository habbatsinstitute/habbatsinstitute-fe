import { FC, ReactElement } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export const Loader: FC = (): ReactElement => {
  return (
    <main className="h-screen w-screen bg-emerald-50">
      <div className="container flex h-full flex-col items-center justify-center gap-2">
        <img src="/logos/black.png" alt="logo" className="my-5 w-24" />
        <div className="flex w-full items-center justify-center gap-3">
          <p className="text-lg">Mempersiapkan...</p>
          <AiOutlineLoading className="animate-spin" />
        </div>
        <p className="text-center">
          Harap tunggu, kami sedang memproses permintaan anda
        </p>
      </div>
    </main>
  );
};
