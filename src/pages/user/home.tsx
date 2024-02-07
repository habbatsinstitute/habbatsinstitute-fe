import { FC, ReactElement } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, Input, Navbar } from "@/components";

export const Home: FC = (): ReactElement => {
  return (
    <main className="flex flex-col overflow-x-hidden overflow-y-hidden bg-[url('/backgrounds/white.jpg')] font-inter">
      <Navbar />
      <section className="container mt-3 flex min-h-[450px]">
        <section className="flex w-full flex-col justify-evenly md:justify-between lg:w-[60%]">
          <h1 className="text-[2rem] font-bold text-[#1E1E1E] md:pt-10 md:text-[3rem] lg:text-[2rem] xl:text-[3rem]">
            Selamat datang di Platform Habbats Institute.
          </h1>
          <section className="flex w-full flex-col gap-5 pb-10">
            <section className="flex w-full gap-3">
              <section className="w-4/5 md:w-[40%]">
                <Input
                  placeholder="Cari topik atau pembahasan"
                  type="text"
                  className="bg-white"
                />
              </section>
              <Button>
                <FaSearch />
              </Button>
            </section>

            <p className="w-full text-font-black-2 md:w-[60%] md:text-sm">
              Kami hadir untuk membawa Anda ke dalam dunia inovasi di balik
              keajaiban alam. Di sini, Anda akan menemukan bagaimana obat-obatan
              herbal tradisional bertemu dengan teknologi canggih, menciptakan
              solusi kesehatan yang revolusioner.
            </p>
          </section>
        </section>
        <section className="hidden w-[40%] place-items-end pb-11 lg:grid">
          <img
            src="/illustrations/doctor-2.png"
            alt="doctor"
            className="relative left-14 scale-150 lg:scale-125"
          />
        </section>
      </section>
    </main>
  );
};
