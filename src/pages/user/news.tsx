import { FC, ReactElement } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Button,
  Footer,
  Navbar,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Trend,
} from "@/components";

export const News: FC = (): ReactElement => {
  const labels = [
    { name: "Tanaman Herbal" },
    { name: "Teknologi Pengobatan" },
    { name: "Tips Kesehatan" },
    { name: "Diet dan Nutrisi" },
    { name: "Apa Kata Medis" },
    { name: "Pengobatan Sunah" },
  ];

  const news = [
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
    {
      title: "Isolat Senyawa Aktif Mannotriose Alternatif Pengobatan Kanker.",
      description: "Tingkat keberhasilan pengobatan kanker..",
      image: "/images/mannotriose.png",
      label: "Teknologi Pengobatan",
      posted: "02 jan 2024",
    },
    {
      title: "Isolat Senyawa Aktif Mannotriose Alternatif Pengobatan Kanker.",
      description: "Tingkat keberhasilan pengobatan kanker..",
      image: "/images/mannotriose.png",
      label: "Teknologi Pengobatan",
      posted: "02 jan 2024",
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
    <main className="relative flex h-[3000px] w-full flex-col font-inter">
      {/* Header */}
      <Navbar />
      <section className="container flex h-[12%] w-full pb-10">
        <section className="w-1/2">
          <h1 className="flex h-full w-[55%] items-end text-[2rem] font-bold text-[#1E212B]">
            Perjalanan edukatif. Mari baca dan pelajari.
          </h1>
        </section>
        <section className="flex h-full w-1/2 flex-col justify-end gap-3">
          <h2 className="text-xl font-bold text-font-black-1">
            Ketegori pembahasan.
          </h2>
          <p className="w-3/4 text-font-black-2">
            Mari bergabung dalam perjalanan edukatif ini, dan temukan bagaimana
            gabungan antara alam dan teknologi dapat mengubah cara kita
            memandang kesehatan.
          </p>
          <section className="flex w-[85%] flex-wrap gap-3">
            {labels.map((label, index) => (
              <section
                key={index}
                className="grid place-items-center rounded-md border border-bright-2 px-4 py-2 font-bold text-font-black-3"
              >
                {label.name}
              </section>
            ))}
          </section>
        </section>
      </section>

      {/* Body */}
      <Trend />
      <section className="container flex h-[40%] w-full flex-col bg-white">
        <hr className="h-[2px] w-full bg-[#36373C]" />
        <h1 className="mt-7 text-[2rem] font-bold text-font-black-1">
          All News
        </h1>
        <section className="mt-10 flex w-full flex-wrap justify-between gap-10">
          {news.map((trend, index) => (
            <section className="flex h-[470px] w-[30%] flex-col" key={index}>
              <img
                src={trend.image}
                alt="trend"
                className="rounded-md object-cover"
              />
              <section className="flex h-[65%] flex-col pt-1">
                <section className="flex items-center gap-1">
                  <img src="/icons/folder.png" alt="folder" />
                  <p>{trend.label}</p>
                </section>
                <h5 className="text-[#707075]">Posted - {trend.posted}</h5>
              </section>
              <section className="flex h-[35%] flex-col gap-3">
                <h3 className="text-lg font-bold text-font-black-1">
                  {trend.title}
                </h3>
                <p>{trend.description}</p>
                <Button className="flex w-[35%] items-center justify-evenly bg-bright-2 font-bold text-font-black-3 hover:bg-green-400">
                  Lebih lengkap <FaArrowRightLong className="text-[#1E212B]" />
                </Button>
              </section>
            </section>
          ))}
          <Pagination className="flex w-full justify-start">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </section>
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

      {/* Footer */}
      <Footer />
    </main>
  );
};