import { useEffect, useState } from "react";
import { Navbar } from "@/components";

export const Course = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    const initialScrollPosition = window.scrollY;
    setScrollPosition(initialScrollPosition);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex flex-col overflow-x-hidden overflow-y-hidden bg-[url('/backgrounds/white.jpg')] font-inter">
      <Navbar
        className={
          scrollPosition > 0 ? "bg-white duration-300 ease-in-out" : ""
        }
      />

      <section className="container mt-16 flex min-h-[450px] flex-row-reverse">
        <section className="flex w-full flex-col justify-center gap-3 md:gap-2 lg:w-[45%]">
          <h1 className="pb-0 text-[1.8rem] font-bold text-[#1E1E1E] md:pb-2 md:text-[2.7rem] lg:text-[2rem]">
            Perjalanan edukatif. <br />
            Mari baca dan pelajari.
          </h1>
          <h3 className="text-[1.3rem] font-bold text-font-black-1 md:text-[1.5rem] lg:text-[1rem]">
            Kategori pembahasan.
          </h3>
          <p className="w-5/6 text-xs text-font-black-2 md:w-[80%] md:text-base lg:text-[0.9rem]">
            Mari bergabung dalam perjalanan edukatif ini, dan temukan bagaimana
            gabungan antara alam dan teknologi dapat mengubah cara kita
            memandang kesehatan.
          </p>
          <div className="flex w-full flex-wrap gap-3 font-bold md:w-4/5 lg:w-11/12">
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Tanaman Herbal
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Teknologi Pengobatan
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Tips Kesehatan
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Diet dan Nutrisi
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Apa Kata Medis
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Pengobatan Sunah
            </div>
          </div>
        </section>
        <section className="hidden w-1/2 place-items-center lg:grid">
          <img
            src="/illustrations/course.png"
            alt="doctor"
            className="relative left-[-170px] top-[30px] scale-150 object-cover xl:top-[10px] xl:scale-125"
          />
        </section>
      </section>
    </main>
  );
};
