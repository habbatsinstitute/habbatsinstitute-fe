import { Button } from "@/components";
import { FC, ReactElement } from "react";

export const Consultant: FC = (): ReactElement => {
  return (
    <section className="flex h-[15%] w-full items-center">
      <section className="flex h-1/2 w-full bg-[url('/backgrounds/green.png')]">
        <section className="container flex w-full">
          <section className="flex w-1/2 flex-col justify-center gap-3">
            <h3 className="ml-[5%] w-[80%] text-[1.3rem] font-bold text-font-black-3">
              Dapatkan konsultasi kesehatan yang terpercaya dengan tim ahli
              medis kami, siap membantu Anda menemukan solusi terbaik untuk
              kesehatan Anda.
            </h3>
            <Button className="ml-[5%] w-[25%]">Konsultasi Sekarang</Button>
          </section>

          <section className="flex w-1/2 items-center justify-center">
            <img
              src="/illustrations/doctor.png"
              alt="doctor"
              className="relative -right-24 -top-20 scale-75"
            />
          </section>
        </section>
      </section>
    </section>
  );
};
