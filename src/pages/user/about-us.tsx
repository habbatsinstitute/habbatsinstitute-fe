import { FC, ReactElement } from "react";
import { Button, Footer, Navbar } from "@/components";
import { FaArrowRightLong } from "react-icons/fa6";

export const AboutUs: FC = (): ReactElement => {
  const teams = [
    {
      name: "Dr. Insan Agung Nugroho",
      position: "Konsultan Medis",
      image: "/images/teams/medic-consultant.png",
      alt: "medic consultant",
    },
    {
      name: "Hendra Kartiko",
      position: "Field Marketing",
      image: "/images/teams/field-marketing.png",
      alt: "Field Marketing",
    },
    {
      name: "Dida",
      position: "IT Support",
      image: "/images/teams/it-support.png",
      alt: "IT Support",
    },
    {
      name: "Diva",
      position: "Content Creation",
      image: "/images/teams/content-creation.png",
      alt: "Content Creation",
    },
    {
      name: "Sani Widiawati",
      position: "Copywritting",
      image: "/images/teams/copywritting.png",
      alt: "Copywritting",
    },
  ];

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
    <main className="relative flex flex-col font-inter">
      <Navbar className="bg-white" />

      <section className="container mt-32 flex flex-col items-center justify-center gap-5">
        <h3 className="text-lg text-font-black-2">Tentang Kami</h3>
        <h1 className="w-[85%] text-center text-[1rem] font-bold text-[#1E212B] md:text-[1.5rem] lg:text-[2.2rem]">
          Visi kami adalah mengangkat produk obat herbal khususnya obat herbal
          sunnah bersaing di tataran pasar obat modern internasional
        </h1>
        <h2 className="w-4/5 text-center text-[0.7rem] md:text-[0.9rem] lg:text-[1.1rem]">
          Selain itu mimpi kami adalah menjadi leader pasar dalam penyedia
          produk herbal habbatussauda baik di pasar domestik maupun regional
          bahkan internasional.
        </h2>
        <img
          src="/images/about-us.png"
          alt="about us"
          className="mt-10 object-cover"
        />
      </section>

      <section className="container mb-10 flex flex-wrap">
        <section className="grid w-full place-items-center md:w-1/2">
          <img
            src="/logos/sehat-nabawi.png"
            alt="logo"
            className="scale-50 object-cover md:scale-75 lg:scale-100"
          />
        </section>
        <section className="grid w-full place-items-center md:w-1/2">
          <p className="w-[80%] text-xs text-font-black-2 lg:text-sm xl:text-base">
            PT. Habbatussauda International (HABBATS) memiliki visi dalam
            mengangkat produk obat herbal khususnya obat herbal sunnah
            berkandungan habbatussauda bersaing di tataran pasar obat modern
            internasional sehingga dapat dirasakan seluas-luasnya manfaat serta
            khasiatnya oleh seluruh umat manusia.
          </p>
        </section>
      </section>

      <section className="flex bg-light-2 py-10 md:py-0">
        <section className="container flex flex-wrap">
          <section className="flex w-full flex-col items-center justify-center gap-3 py-5 md:w-1/2 md:items-start md:py-0">
            <h1 className="w-4/5 text-[1rem] font-bold text-font-black-1 md:w-[60%] md:text-[1.2rem] xl:text-[1.6rem]">
              Memiliki kerjasama dengan dokter profesional
            </h1>
            <p className="w-4/5 text-xs text-font-black-2 md:w-[70%] lg:text-sm xl:text-base">
              Kami dapat mengurus langsung konsultasi para konsumen secara
              langsung agar tetap menjaga ikatan antara konsumen dengan
              principle melalui after sales service yang baik.
            </p>
          </section>
          <section className="grid w-full place-items-center md:w-1/2">
            <img
              src="/images/doctor.png"
              alt="doctor"
              className="scale-75 object-cover"
            />
          </section>
        </section>
      </section>

      <section className="flex flex-col gap-10 py-10 md:pt-10 lg:py-10">
        <section className="container flex flex-col items-center justify-center gap-5">
          <h1 className="text-[1.5rem] font-bold text-font-black-1">
            Tim Kami
          </h1>
          <p className="w-full text-center text-font-black-2 md:w-1/2">
            Memiliki team yang kuat di bidang produksi, marketing, perizinan
            yang menguasai bidangnya dan terbaik di kelasnya.
          </p>
        </section>

        <section className="container flex flex-wrap justify-center gap-3">
          {teams.map(({ name, position, image, alt }, index) => (
            <section
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <img
                src={image}
                alt={alt}
                className="scale-90 rounded-md object-cover"
              />
              <h1 className="text-[1rem] font-bold text-font-black-1">
                {name}
              </h1>
              <p className="text-font-black-2">{position}</p>
            </section>
          ))}
        </section>
      </section>

      <section className="mt-0 flex min-h-[200px] flex-col justify-end gap-5 bg-white md:min-h-[400px] lg:mt-20">
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

      <section className="z-10 flex min-h-[600px] flex-col justify-evenly gap-5 bg-white pt-10 md:gap-0">
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

      <Footer className="mt-10" />
    </main>
  );
};
