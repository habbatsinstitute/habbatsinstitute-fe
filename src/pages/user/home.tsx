import { FC, ReactElement, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, Input, Navbar } from "@/components";
import { LuPlay, LuUser2 } from "react-icons/lu";
import { getAccessToken } from "@/lib";

export const Home: FC = (): ReactElement => {
  const [isLoggin] = useState(getAccessToken() ? true : false);

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

      <section className="flex min-h-[700px] flex-col justify-evenly gap-10 bg-dark-2 py-20 xl:gap-0 xl:py-0">
        <div className="container h-[2px] w-4/5 bg-dark-3 xl:w-full" />
        <section className="container mt-2 flex items-center justify-center xl:justify-between">
          <div className="hidden h-[90px] w-[200px] place-items-center rounded-md bg-dark-3 text-font-white xl:grid">
            <h3>Course for You</h3>
          </div>
          <h1 className="w-11/12 font-bold text-font-white md:w-4/5 lg:text-[1.3rem]">
            Dapatkan akses ke informasi terkini tentang pengembangan{" "}
            <span className="text-bright-1">obat-obatan herbal</span>,{" "}
            <span className="text-bright-1">teknologi ekstraksi terbaru</span>,
            dan <span className="text-bright-1">penelitian-penelitian</span>{" "}
            terkait yang sedang berlangsung.{" "}
          </h1>
        </section>
        <section className="container flex flex-wrap justify-center gap-10 xl:justify-between xl:gap-0">
          <div className="flex h-[500px] max-w-[92%] flex-col items-center justify-evenly gap-2 rounded-md bg-dark-3 py-5 md:h-[400px] md:max-w-[80%] md:gap-0 lg:max-w-[40%] lg:py-2 xl:max-w-[45%]">
            <video
              className="h-[60%] w-[83%] bg-slate-700 md:w-[90%]"
              controls={isLoggin}
              onContextMenu={(e) => e.preventDefault()}
              controlsList="nodownload"
            >
              <source src="https://res.cloudinary.com/ddudewmxj/video/upload/v1707146745/course/yx0nhf2blb4wbnwl1nfc.mp4" />
            </video>
            <div className="container">
              <h1 className="text-base font-bold text-font-white md:text-lg">
                Manfaat biji tokek albino untuk kesehatan tenggorokan dan obat
                batuk.
              </h1>
            </div>
            <div className="container flex items-center gap-2">
              <LuUser2 className="text-bright-1" />
              <p className="font-black-2">Toto Bedog - 16 jan 2024</p>
            </div>
            <div className="container flex w-full justify-end">
              <Button className="flex items-center gap-1 bg-bright-1 font-bold text-font-black-1 hover:bg-font-black-1 hover:text-white">
                <LuPlay />
                Lihat Course
              </Button>
            </div>
          </div>
          <div className="flex h-[500px] max-w-[92%] flex-col items-center justify-evenly gap-2 rounded-md bg-dark-3 py-5 md:h-[400px] md:max-w-[80%] md:gap-0 lg:max-w-[40%] lg:py-2 xl:max-w-[45%]">
            <video
              className="h-[60%] w-[83%] bg-slate-700 md:w-[90%]"
              controls={isLoggin}
              onContextMenu={(e) => e.preventDefault()}
              controlsList="nodownload"
            >
              <source src="https://res.cloudinary.com/ddudewmxj/video/upload/v1707146745/course/yx0nhf2blb4wbnwl1nfc.mp4" />
            </video>
            <div className="container">
              <h1 className="text-base font-bold text-font-white md:text-lg">
                Manfaat biji tokek albino untuk kesehatan tenggorokan dan obat
                batuk.
              </h1>
            </div>
            <div className="container flex items-center gap-2">
              <LuUser2 className="text-bright-1" />
              <p className="font-black-2">Toto Bedog - 16 jan 2024</p>
            </div>
            <div className="container flex w-full justify-end">
              <Button className="flex items-center gap-1 bg-bright-1 font-bold text-font-black-1 hover:bg-font-black-1 hover:text-white">
                <LuPlay />
                Lihat Course
              </Button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};
