import { FC, ReactElement } from "react";

export const Header: FC = (): ReactElement => {
  return (
    <section className="container flex h-[510px] w-full flex-col items-center justify-evenly gap-1">
      <img
        src="/images/mannotriose.png"
        alt="cover news"
        className="h-[60%] w-[55%] rounded-md object-cover"
      />
      <section className="w-[55%]">
        <h1 className="w-3/4 text-[1.2rem] font-bold text-font-black-1">
          Isolat Senyawa Aktif Mannotriose Alternatif Pengobatan Kanker.
        </h1>
        <section className="flex flex-col">
          <section className="flex items-center gap-1">
            <img src="/icons/folder.png" alt="folder" />
            <p>Tanaman Herbal</p>
          </section>
          <h5 className="text-[#707075]">Posted - 17 jan 2024</h5>
        </section>
      </section>
    </section>
  );
};
