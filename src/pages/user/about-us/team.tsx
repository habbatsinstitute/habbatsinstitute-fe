import { Button } from "@/components";
import { FC, ReactElement } from "react";

export const Team: FC = (): ReactElement => {
  const team = [
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

  return (
    <section className="flex h-[30%] w-full flex-col items-center justify-between">
      <section className="container flex w-full flex-col items-center justify-center gap-2 pt-20">
        <h1 className="text-font-black-1 text-[1.5rem] font-bold">Tim Kami</h1>
        <p className="text-font-black-2">
          Memiliki team yang kuat di bidang produksi, marketing, perizinan yang
          menguasai bidangnya dan terbaik di kelasnya.
        </p>
      </section>

      <section className="container flex w-full justify-center gap-3">
        {team.map(({ name, position, image, alt }, index) => (
          <section
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <img
              src={image}
              alt={alt}
              className="scale-90 rounded-md object-cover"
            />
            <h1 className="text-font-black-1 text-[1rem] font-bold">{name}</h1>
            <p className="text-font-black-2">{position}</p>
          </section>
        ))}
      </section>
      <section className="flex h-1/2 w-full items-center">
        <section className="flex h-1/2 w-full bg-[url('/backgrounds/green.png')]">
          <section className="container flex w-full">
            <section className="flex w-1/2 flex-col justify-center gap-3">
              <h3 className="text-font-black-3 ml-[5%] w-[80%] text-[1.3rem] font-bold">
                Dapatkan konsultasi kesehatan yang terpercaya dengan tim ahli
                medis kami, siap membantu Anda menemukan solusi terbaik untuk
                kesehatan Anda.
              </h3>
              <Button className="ml-[5%] w-[25%]">Konsultasi Sekarang</Button>
            </section>

            <section className="flex w-1/2 items-center justify-center">
              <img
                src="illustrations/doctor.png"
                alt="doctor"
                className="relative -top-14 scale-75"
              />
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};
