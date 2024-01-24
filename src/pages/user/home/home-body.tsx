import { FC, ReactElement } from "react";

export const HomeBody: FC = (): ReactElement => {
  return (
    <section className="h-[90%] w-full border border-black">
      <section className="flex h-[20%] w-full flex-col items-center justify-center bg-dark-2">
        <hr className="container h-1 w-[89%] text-[#36373C]" />
        <section className="container flex w-full justify-between">
          <section className="bg-dark-3 grid h-full w-[20%] place-items-center rounded-md text-font-white">
            <h3>Course For You.</h3>
          </section>
          <h2 className="w-[70%] text-[1.5rem] font-bold text-font-white">
            Dapatkan akses ke informasi terkini tentang pengembangan
            <span className="text-bright-1"> obat-obatan herbal</span>,
            <span className="text-bright-1"> teknologi ekstraksi terbaru</span>,
            dan <span className="text-bright-1">penelitian-penelitian </span>
            terkait yang sedang berlangsung.
          </h2>
        </section>
        <section className="w-full"></section>
      </section>
    </section>
  );
};
