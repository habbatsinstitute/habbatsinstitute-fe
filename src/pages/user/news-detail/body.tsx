import { Button, Trend } from "@/components";
import { FC, ReactElement } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export const Body: FC = (): ReactElement => {
  return (
    <section className="container flex w-full flex-col items-center">
      <hr className="h-[2px] w-[93%] bg-[#36373C]" />
      <section className="flex w-full flex-col items-center">
        <h1 className="mr-[8%] pt-10 text-[2rem] font-bold text-font-black-1">
          Tingkat keberhasilan pengobatan kanker.
        </h1>
        <div className="w-[55%] py-10">
          Tingkat keberhasilan pengobatan kanker hingga saat ini masih rendah.
          Hanya sekitar 30 persen pasien kanker yang berhasil sembuh ketika
          menjalani pengobatan. Di antara masalah utama dalam pengobatan kanker
          adalah timbulnya resistensi sel kanker terhadap antikanker yang
          tersedia dan munculnya efek samping yang serius akibat target aksi
          antikanker yang tidak spesifik. Sebagian besar antikanker juga
          menyerang 3 sel normal yang berdampak timbulnya efek samping tersebut.
          “Kanker payudara masih menjadi masalah kesehatan utama di dunia dengan
          morbiditas dan mortalitasnya yang masih tinggi,” ujar Fikri
          Febriansyah, S.Farm., M.Sc., Apt saat menempuh ujian program doktor di
          Fakultas Kedokteran, Kesehatan Masyarakat dan Keperawatan UGM, Rabu
          (11/8). Tahap selanjutnya, dilakukan pengkajian mekanisme aksi secara
          molekuler dari senyawa aktif hasil isolasi. Uji in vitro dilakukan
          dengan metode flowcytometry untuk melihat perubahan siklus sel akibat
          perlakuan senyawa isolat, dan metode imunositokimia untuk melihat
          adanya modulasi ekspresi beberapa protein target pada sel MCF-7 akibat
          perlakuan senyawa uji. Secara in silico dilakukan analisis molecular
          docking menggunakan software Autodock Vina antara isolat senyawa aktif
          terhadap beberapa protein target untuk mengonfirmasi hasil dari uji in
          vitro. “Hasil penelitian terkait optimasi metode kultur berdasarkan
          analisis kemometrik diketahui bahwa metode kultur menggunakan media
          Starch Nitrate Broth (SNB), wadah erlenmeyer biasa dan waktu kultur
          selama 5 hari menunjukkan hasil dan aktivitas sitotoksik yang terbaik
          dibandingkan dengan metode kultur yang lain,” ungkapnya. Hasil isolasi
          senyawa aktif pada ekstrak metanol bakteri Streptomyces sp. GMY01
          diketahui bahwa senyawa aktif antikanker pada ekstrak tersebut berupa
          senyawa mannotriose. Isolat senyawa mannotriose mempunyai nilai IC50
          sebesar 5,6 ug/ml pada sel kanker MCF-7 dan IC50 sebesar 687 ug/ml
          pada sel normal Vero.
        </div>
      </section>
      <section className="flex w-[60%] justify-end">
        <Button variant={"outline"} className="mb-10 gap-3">
          Next News - Khasiat Kulit Manggis untuk.. <FaArrowRightLong />
        </Button>
      </section>
      <Trend />
    </section>
  );
};
