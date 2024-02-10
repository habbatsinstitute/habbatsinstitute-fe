import { FC, ReactElement } from "react";
import { useNavigate } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button, Navbar, Footer } from "@/components";
import { getAccessToken } from "@/lib";

export const NewsDetail: FC = (): ReactElement => {
  const navigate = useNavigate();

  const string = `Jahe, bahan herba yang sering digunakan dalam pengobatan tradisional, telah dikenal karena beragam manfaat kesehatannya. Jahe mengandung senyawa aktif seperti gingerol dan shogaol yang memiliki sifat anti-inflamasi dan anti-oksidan. Penggunaan jahe telah terbukti efektif dalam meredakan mual dan muntah, mengurangi nyeri sendi, serta meningkatkan pencernaan. Selain itu, minuman jahe hangat sering dikonsumsi sebagai obat alami untuk meredakan gejala flu dan pilek.\r\n\r\nKurkumin, yang ditemukan dalam kunyit, adalah salah satu bahan herba yang paling banyak dipelajari karena potensi kesehatannya yang luar biasa. Senyawa ini dikenal memiliki sifat anti-inflamasi, anti-kanker, dan anti-oksidan yang kuat. Studi telah menunjukkan bahwa kurkumin dapat membantu mengurangi risiko penyakit jantung, mengurangi peradangan dalam tubuh, serta membantu melawan pertumbuhan sel-sel kanker. Selain itu, kurkumin juga telah digunakan dalam pengobatan tradisional untuk mengurangi gejala arthritis dan meningkatkan kesehatan otak.`;

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
    <main className="flex flex-col overflow-x-visible font-inter">
      <Navbar className="bg-white" />

      <section className="container mt-32 flex flex-col items-center gap-10">
        <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1492552085122-36706c238263?q=80&w=1497&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="news-cover"
            className="object-cover"
          />
          <h1 className="text-2xl font-bold text-font-black-1">
            Isolat Senyawa Aktif Mannotriose Alternatif Pengobatan Kanker.
          </h1>
          <div className="flex flex-col">
            <section className="flex items-center gap-1">
              <img src="/icons/folder.png" alt="folder" />
              <p>Tanaman herbal</p>
            </section>
            <h5 className="text-[#707075]">Posted - 17 jan 2024</h5>
          </div>
        </div>
        <div className="h-[1px] w-full bg-dark-3" />
      </section>

      <div className="container mt-10 flex justify-center">
        <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-1/2">
          <pre className="whitespace-pre-wrap break-words font-inter">
            {string}
          </pre>
        </div>
      </div>

      <div className="w-ful container mt-10 flex justify-end xl:w-1/2">
        <Button variant={"outline"}>
          Next News - Khasiat Kulit Manggis untuk.. <FaArrowRightLong />
        </Button>
      </div>

      <section className="mt-0 flex min-h-[600px] flex-col justify-evenly gap-5 bg-white pt-10 md:gap-0 md:pt-0 xl:mt-10">
        <div className="container h-[1px] w-4/5 bg-[#36373C] md:w-[95%]" />
        <h1 className="container text-[2rem] font-bold text-font-black-1">
          News Trend
        </h1>
        <section className="container flex flex-wrap justify-between gap-10 md:gap-0">
          {trends.map((trend, index) => (
            <section
              className="flex min-h-[400px] w-full flex-col justify-between md:w-[29.5%]"
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

      <section className="flex min-h-[200px] flex-col justify-end gap-5 bg-white pt-20 md:min-h-[400px] md:pt-0 lg:pt-48">
        <div className="flex h-[250px] bg-[url('/backgrounds/green.png')] bg-cover lg:h-[300px]">
          <div className="container flex">
            <div className="flex w-full flex-col justify-center gap-3 md:w-1/2">
              <h3 className="text-base font-bold text-font-black-3 md:text-lg lg:text-2xl">
                Dapatkan konsultasi kesehatan yang terpercaya dengan tim ahli
                medis kami, siap membantu Anda menemukan solusi terbaik untuk
                kesehatan Anda.
              </h3>
              <div>
                <Button
                  onClick={() =>
                    getAccessToken() ? navigate("/courses") : navigate("/login")
                  }
                >
                  Konsultasi Sekarang
                </Button>
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
