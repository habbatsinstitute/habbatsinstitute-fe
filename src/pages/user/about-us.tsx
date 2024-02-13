import { FC, ReactElement } from "react";
import { Consultant, Footer, Navbar, TrendNews } from "@/components";

export const AboutUs: FC = (): ReactElement => {
  const teams = [
    {
      name: "Dr. Insan Agung Nugroho",
      position: "Konsultan Medis",
      image: "/images/teams/medic-consultant.png",
      alt: "Konsultan Medis",
    },
    {
      name: "Hendra Kartiko",
      position: "Field Marketing",
      image:
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      image:
        "https://images.unsplash.com/photo-1574297500578-afae55026ff3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Content Creation",
    },
    {
      name: "Sani Widiawati",
      position: "Copywritting",
      image:
        "https://images.unsplash.com/flagged/photo-1577614742608-393919945ee2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Copywritting",
    },
    {
      name: "Devia",
      position: "Admin",
      image:
        "https://images.unsplash.com/photo-1550546094-9835463f9f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Admin",
    },
    {
      name: "Fajar",
      position: "Designer",
      image: "/images/teams/field-marketing.png",
      alt: "Designer",
    },
    {
      name: "Nanan",
      position: "Admin online shop",
      image:
        "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Admin online shop",
    },
    {
      name: "Maya",
      position: "Field marketing",
      image: "/images/teams/copywritting.png",
      alt: "Field marketing",
    },
  ];

  return (
    <main className="relative flex flex-col font-inter">
      <Navbar className="bg-white" />

      {/* About Us */}
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

      {/* Profile Company */}
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

      {/* Doctor */}
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

      {/* Team */}
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
                className="h-[300px] w-[300px] scale-90 rounded-md object-cover"
              />
              <h1 className="text-[1rem] font-bold text-font-black-1">
                {name}
              </h1>
              <p className="text-font-black-2">{position}</p>
            </section>
          ))}
        </section>
      </section>

      <Consultant className="bg-white md:pt-32" />

      <TrendNews />

      <Footer className="mt-10" />
    </main>
  );
};
