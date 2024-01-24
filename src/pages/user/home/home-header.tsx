import { Button, Input } from "@/components";
import { FC, ReactElement } from "react";
import { FaSearch } from "react-icons/fa";

export const HomeHeader: FC = (): ReactElement => {
  return (
    <section className="container flex h-[14%] w-full">
      <section className="flex w-[60%] flex-col justify-between">
        <h1 className="pt-10 text-[3rem] font-bold text-[#1E1E1E]">
          Selamat datang di Platform Habbats Institute.
        </h1>
        <section className="flex w-full flex-col gap-5 pb-10">
          <section className="flex w-full gap-3">
            <section className="w-[40%]">
              <Input placeholder="Cari topik atau pembahasan" type="text" />
            </section>
            <Button>
              <FaSearch />
            </Button>
          </section>

          <p className="w-[60%] text-sm text-font-black-2">
            Kami hadir untuk membawa Anda ke dalam dunia inovasi di balik
            keajaiban alam. Di sini, Anda akan menemukan bagaimana obat-obatan
            herbal tradisional bertemu dengan teknologi canggih, menciptakan
            solusi kesehatan yang revolusioner.
          </p>
        </section>
      </section>
      <section className="grid w-[40%] place-items-end pb-11">
        <img
          src="/illustrations/doctor-2.png"
          alt="doctor"
          className="scale-125"
        />
      </section>
    </section>
  );
};
