import { Navbar } from "@/components";
import { FC, Fragment, ReactElement } from "react";

export const AboutUsHeader: FC = (): ReactElement => {
  return (
    <Fragment>
      <Navbar />

      <section className="container mt-14 flex w-full flex-col items-center justify-center gap-5">
        <h3 className="text-lg text-font-black-2">Tentang Kami</h3>
        <h1 className="mx-auto w-[80%] text-center text-[2.2rem] font-bold text-[#1E212B]">
          Visi kami adalah mengangkat produk obat herbal khususnya obat herbal
          sunnah bersaing di tataran pasar obat modern internasional
        </h1>
        <h2 className="mx-auto w-[70%] text-center text-[1.1rem]">
          Selain itu mimpi kami adalah menjadi leader pasar dalam penyedia
          produk herbal habbatussauda baik di pasar domestik maupun regional
          bahkan internasional.
        </h2>
        <img
          src="/images/about-us.png"
          alt="about us"
          className="scale-95 object-cover pt-20"
        />
      </section>
    </Fragment>
  );
};
