import { FC, ReactElement, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { LuPlay, LuUser2 } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiNews } from "react-icons/bi";
import { Button, Footer, Input, Navbar } from "@/components";
import { getAccessToken } from "@/lib";

export const Home: FC = (): ReactElement => {
  const [isLoggin] = useState(getAccessToken() ? true : false);
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

  const trends = [
    {
      title: "Si Kuning Kunyit Kaya Manfaat",
      description:
        "Kunyit telah dikenal untuk merawat kulit dan membantu menyembuhkan luka..",
      image: "/images/turmeric.png",
      label: "Tanaman Herbal",
      posted: "17 jan 2024",
    },
    {
      title: "Khasiat Kulit Manggis untuk Cegah Kanker, Benarkah?",
      description: "Masyarakat Indonesia sudah tidak asing..",
      image: "/images/mangosteen.png",
      label: "Diet dan Nutrisi",
      posted: "08 jan 2024",
    },
    {
      title: "Isolat Senyawa Aktif Mannotriose Alternatif Pengobatan Kanker.",
      description: "Tingkat keberhasilan pengobatan kanker..",
      image: "/images/mannotriose.png",
      label: "Teknologi Pengobatan",
      posted: "02 jan 2024",
    },
  ];

  return (
    <main className="flex flex-col overflow-x-hidden overflow-y-hidden bg-[url('/backgrounds/white.jpg')] font-inter">
      <Navbar
        className={
          scrollPosition > 0 ? "bg-white duration-300 ease-in-out" : ""
        }
      />

      <section className="container mt-24 flex min-h-[450px]">
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
            className="relative left-14 scale-150 lg:top-[10px] lg:scale-125 xl:top-0"
          />
        </section>
      </section>

      <section className="z-10 flex min-h-[700px] flex-col justify-evenly gap-10 bg-dark-2 py-20 xl:gap-0 xl:py-0">
        <div className="container h-[2px] w-4/5 bg-dark-3 md:w-[95%]" />
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
              className="h-[60%] w-[83%] bg-slate-700 object-fill md:w-[90%]"
              controls={isLoggin}
              onContextMenu={(e) => e.preventDefault()}
              controlsList="nodownload"
              preload="metadata"
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
              <p className="font-black-2 text-sm md:text-base">
                Toto Bedog - 16 jan 2024
              </p>
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
              className="h-[60%] w-[83%] bg-slate-700 object-fill md:w-[90%]"
              controls={isLoggin}
              onContextMenu={(e) => e.preventDefault()}
              controlsList="nodownload"
              preload="metadata"
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
              <p className="font-black-2 text-sm md:text-base">
                Toto Bedog - 16 jan 2024
              </p>
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

      <section className="flex min-h-[400px] flex-col justify-evenly gap-5 bg-white py-20">
        <div className="container">
          <img src="/images/about-us.png" alt="about us" />
        </div>
        <div className="container flex min-h-[300px] flex-wrap gap-5 md:gap-0">
          <div className="w-full md:w-1/2">
            <h1 className="text-[2.5rem] font-bold text-[#1E212B]">
              Kenali kami lebih dalam.
            </h1>
          </div>
          <div className="flex w-full flex-col md:w-1/2">
            <p className="text-lg text-font-black-2">
              PT. Habbatussauda International (HABBATS) memiliki visi dalam
              mengangkat produk obat herbal khususnya obat herbal sunnah
              berkandungan habbatussauda bersaing di tataran pasar obat modern
              internasional sehingga dapat dirasakan seluas-luasnya manfaat
              serta khasiatnya oleh seluruh umat manusia.
            </p>
            <div className="mt-5">
              <Button className="bg-bright-2 font-black text-font-black-3 hover:bg-bright-1">
                Tentang Kami
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-[600px] flex-col justify-evenly gap-5 bg-light-2 md:gap-0">
        <div className="container h-[1px] w-4/5 bg-[#36373C] md:w-[95%]" />
        <h1 className="container text-[2rem] font-bold text-font-black-1">
          News Trend
        </h1>
        <section className="container flex flex-wrap justify-between gap-10 md:gap-0">
          {trends.map((trend, index) => (
            <section
              className="flex min-h-[400px] w-full flex-col justify-between md:w-[30%]"
              key={index}
            >
              <section className="flex flex-col pt-1">
                <img
                  src={trend.image}
                  alt="trend"
                  className=" rounded-md object-cover"
                />
                <section className="flex items-center gap-1">
                  <img src="/icons/folder.png" alt="folder" />
                  <p>{trend.label}</p>
                </section>
                <h5 className="text-[#707075]">Posted - {trend.posted}</h5>
              </section>
              <section className="flex flex-col gap-2 pt-2">
                <h3 className="text-lg font-bold text-font-black-1">
                  {trend.title}
                </h3>
                <p>{trend.description}</p>
                <div className="pt-1 md:pt-0">
                  <Button className="flex items-center justify-center gap-2 bg-bright-2 font-bold text-font-black-3 hover:bg-green-400">
                    Lebih lengkap
                    <FaArrowRightLong className="pt-1 text-[#1E212B]" />
                  </Button>
                </div>
              </section>
            </section>
          ))}
        </section>
      </section>

      <section className="flex min-h-[400px] flex-col justify-evenly gap-5 bg-light-2 py-10 md:gap-0 md:py-0">
        <div className="container h-[1px] w-4/5 bg-[rgb(54,55,60)] md:w-[95%]" />
        <div className="container mt-3 flex flex-wrap justify-between gap-10 md:mt-0 md:gap-0">
          <div className="flex w-full flex-col justify-evenly gap-5 md:w-[45%] md:gap-3">
            <h1 className="text-2xl font-bold text-font-black-1">
              Kategori pembahasan.
            </h1>
            <p className="text-sm text-font-black-2 lg:text-base xl:text-lg">
              Mari bergabung dalam perjalanan edukatif ini, dan temukan
              bagaimana gabungan antara alam dan teknologi dapat mengubah cara
              kita memandang kesehatan.
            </p>
            <div className="flex w-full flex-wrap gap-3 font-bold">
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
          </div>
          <div className="flex w-full flex-col gap-5 md:w-1/2">
            <h1 className="text-[2rem] font-bold text-[#1E1E1E] md:text-[3rem] xl:text-[4rem]">
              Mengeksplorasi perjalanan edukasi.
            </h1>
            <div>
              <Button className="flex gap-2">
                Lihat halaman news
                <BiNews />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-[200px] flex-col justify-end gap-5 bg-light-2 md:min-h-[400px]">
        <div className="flex h-[250px] bg-[url('/backgrounds/green.png')] bg-cover lg:h-[300px]">
          <div className="container flex">
            <div className="flex w-full flex-col justify-center gap-3 md:w-1/2">
              <h3 className="text-base font-bold text-font-black-3 md:text-lg lg:text-2xl">
                Dapatkan konsultasi kesehatan yang terpercaya dengan tim ahli
                medis kami, siap membantu Anda menemukan solusi terbaik untuk
                kesehatan Anda.
              </h3>
              <div>
                <Button>Konsultasi Sekarang</Button>
              </div>
            </div>
            <div className="hidden w-1/2 items-center justify-center md:flex">
              <img
                src="/illustrations/doctor.png"
                alt="doctor"
                className="relative scale-90 md:bottom-[12%] lg:bottom-[21%] xl:bottom-[27.5%]"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer className="z-10" />
    </main>
  );
};
