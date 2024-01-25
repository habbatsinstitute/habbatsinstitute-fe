import { Button, Trend } from "@/components";
import { FC, Fragment, ReactElement } from "react";

export const AboutUsBody: FC = (): ReactElement => {
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

  return (
    <Fragment>
      <section className="flex h-[18%] w-full flex-col">
        <section className="container flex w-full">
          <section className="grid w-1/2 place-items-center">
            <img
              src="/logos/sehat-nabawi.png"
              alt="logo"
              className="scale-75 object-cover"
            />
          </section>
          <section className="grid w-1/2 place-items-center">
            <p className="w-[80%] text-font-black-2">
              PT. Habbatussauda International (HABBATS) memiliki visi dalam
              mengangkat produk obat herbal khususnya obat herbal sunnah
              berkandungan habbatussauda bersaing di tataran pasar obat modern
              internasional sehingga dapat dirasakan seluas-luasnya manfaat
              serta khasiatnya oleh seluruh umat manusia.
            </p>
          </section>
        </section>

        <section className="flex w-full bg-light-2">
          <section className="container flex w-full">
            <section className="flex w-1/2 flex-col justify-center gap-3 pl-[5%]">
              <h1 className="w-[60%] text-[1.5rem] font-bold text-font-black-1">
                Memiliki kerjasama dengan dokter profesional
              </h1>
              <p className="w-[70%] text-font-black-2">
                Kami dapat mengurus langsung konsultasi para konsumen secara
                langsung agar tetap menjaga ikatan antara konsumen dengan
                principle melalui after sales service yang baik.
              </p>
            </section>
            <section className="grid w-1/2 place-items-center">
              <img
                src="/images/doctor.png"
                alt="doctor"
                className="scale-75 object-cover"
              />
            </section>
          </section>
        </section>
      </section>

      <section className="flex h-[30%] w-full flex-col gap-10">
        <section className="container flex w-full flex-col items-center justify-center gap-2 pt-20">
          <h1 className="text-[1.5rem] font-bold text-font-black-1">
            Tim Kami
          </h1>
          <p className="w-1/2 text-center text-font-black-2">
            Memiliki team yang kuat di bidang produksi, marketing, perizinan
            yang menguasai bidangnya dan terbaik di kelasnya.
          </p>
        </section>

        <section className="container flex w-full justify-center gap-3">
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

        <section className="flex h-1/2 w-full items-center">
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
                  src="illustrations/doctor.png"
                  alt="doctor"
                  className="relative -right-24 -top-16 scale-75"
                />
              </section>
            </section>
          </section>
        </section>
      </section>
      <Trend />
    </Fragment>
  );
};
