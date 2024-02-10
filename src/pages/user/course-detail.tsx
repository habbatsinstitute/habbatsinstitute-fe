import { FC, ReactElement } from "react";
import { useNavigate } from "react-router";
import { UserRound } from "lucide-react";
import { Button, Navbar, Footer } from "@/components";
import { getAccessToken } from "@/lib";

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

export const CourseDetail: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col overflow-x-visible font-inter">
      <Navbar className="bg-white" />

      <section className="container mt-24 flex min-h-[400px] flex-wrap justify-between">
        <div className="flex w-full flex-col gap-1 lg:w-[70%]">
          <div className="h-[200px] md:h-[400px]">
            <video
              controls
              onContextMenu={(e) => e.preventDefault()}
              controlsList="nodownload"
              className="h-full w-full rounded-md object-fill"
              preload="metadata"
            >
              <source src="https://res.cloudinary.com/ddudewmxj/video/upload/v1707146745/course/yx0nhf2blb4wbnwl1nfc.mp4" />
            </video>
          </div>
          <h1 className="text-[1rem] font-black text-[#1E212B] md:text-[1.7rem] lg:text-[2rem]">
            Pengobatan Holistik dengan Tanaman Herbal: Memahami Peran Nutrisi
            dalam Kesehatan
          </h1>
          <div className="flex items-center gap-1">
            <UserRound className="p-1" />
            <p className="text-sm">Toto Bedog - 16 jan 2024</p>
          </div>

          <p className="mt-3 text-font-black-2">
            Kami hadir untuk membawa Anda ke dalam dunia inovasi di balik
            keajaiban alam. Di sini, Anda akan menemukan bagaimana obat-obatan
            herbal tradisional bertemu dengan teknologi canggih, menciptakan
            solusi kesehatan yang revolusioner. Mari bergabung dalam perjalanan
            edukatif ini, dan temukan bagaimana gabungan antara alam dan
            teknologi dapat mengubah cara kita memandang kesehatan.
          </p>
        </div>

        <div className="mt-20 flex w-full flex-wrap gap-7 lg:mt-0 lg:w-[25%] lg:gap-10">
          {trends.map((trend, index) => (
            <section
              className="flex w-full flex-col rounded-md bg-light-2 p-3 py-4 shadow-lg md:w-[30%] lg:w-full"
              key={index}
            >
              <section className="flex flex-col py-2">
                <video
                  controls
                  onContextMenu={(e) => e.preventDefault()}
                  controlsList="nodownload"
                  className="h-full w-full rounded-md object-fill"
                  preload="metadata"
                >
                  <source src="https://res.cloudinary.com/ddudewmxj/video/upload/v1707146745/course/yx0nhf2blb4wbnwl1nfc.mp4" />
                </video>
                <section className="flex items-center gap-1">
                  <UserRound className="p-1" />
                  <p className="text-sm">{trend.label}</p>
                </section>
                <h5 className="text-[#707075]">Posted - {trend.posted}</h5>
              </section>
              <section className="flex flex-col gap-2 pt-2">
                <h3 className="text-lg font-bold text-font-black-1 md:text-base">
                  {trend.title}
                </h3>
                <p>{trend.description}</p>
              </section>
            </section>
          ))}
        </div>
      </section>

      <section className="flex min-h-[200px] flex-col justify-end gap-5 bg-white pt-20 md:min-h-[400px] md:pt-0 lg:pt-56">
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
