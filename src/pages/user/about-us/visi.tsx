import { FC, ReactElement } from "react";

export const Visi: FC = (): ReactElement => {
  return (
    <section className="flex h-[45%] w-full flex-col">
      <section className="container mt-14 flex w-full flex-col items-center justify-center gap-5">
        <h3 className="text-font-black-2 text-lg">Tentang Kami</h3>
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

      <section className="container flex w-full">
        <section className="grid w-1/2 place-items-center">
          <img
            src="/logos/sehat-nabawi.png"
            alt="logo"
            className="scale-75 object-cover"
          />
        </section>
        <section className="grid w-1/2 place-items-center">
          <p className="text-font-black-2 w-[80%]">
            PT. Habbatussauda International (HABBATS) memiliki visi dalam
            mengangkat produk obat herbal khususnya obat herbal sunnah
            berkandungan habbatussauda bersaing di tataran pasar obat modern
            internasional sehingga dapat dirasakan seluas-luasnya manfaat serta
            khasiatnya oleh seluruh umat manusia.
          </p>
        </section>
      </section>

      <section className="bg-light-2 flex w-full">
        <section className="container flex w-full">
          <section className="flex w-1/2 flex-col justify-center gap-3 pl-[5%]">
            <h1 className="text-font-black-1 w-[60%] text-[1.5rem] font-bold">
              Memiliki kerjasama dengan dokter profesional
            </h1>
            <p className="text-font-black-2 w-[70%]">
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
  );
};
