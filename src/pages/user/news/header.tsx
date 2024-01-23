import { FC, ReactElement } from "react";

export const Header: FC = (): ReactElement => {
  const labels = [
    { name: "Tanaman Herbal" },
    { name: "Teknologi Pengobatan" },
    { name: "Tips Kesehatan" },
    { name: "Diet dan Nutrisi" },
    { name: "Apa Kata Medis" },
    { name: "Pengobatan Sunah" },
  ];

  return (
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
          gabungan antara alam dan teknologi dapat mengubah cara kita memandang
          kesehatan.
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
  );
};
