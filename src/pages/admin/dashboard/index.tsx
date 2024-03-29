import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { GoBook } from "react-icons/go";
import { LuNewspaper, LuUsers } from "react-icons/lu";
import { PiChatCircle } from "react-icons/pi";
import { AdminLayout } from "@/components";

export const Dashboard: FC = (): ReactElement => {
  const cards = [
    {
      to: "/dashboard/courses",
      icon: <GoBook className="text-lg" />,
      title: "Manage Couses",
      desc: "Kelola course secara efisien. Tambahkan, edit dan hapus course, serta mengatur berbagai detail seperti deskripsi course, jadwal, dan materi pembelajaran.",
    },
    {
      to: "/dashboard/news",
      icon: <LuNewspaper className="text-lg" />,
      title: "Manage News",
      desc: "Kelola news secara efisien. Tambahkan, edit dan hapus news, serta mengatur berbagai detail seperti deskripsi news.",
    },
    {
      to: "/dashboard/users",
      icon: <LuUsers className="text-lg" />,
      title: "Manage Users",
      desc: "Kelola user secara efisien. Tambahkan, edit dan hapus user.",
    },
    {
      to: "/dashboard",
      icon: <PiChatCircle className="text-lg" />,
      title: "Realtime Chat",
      desc: "Kelola chat secara efisien. Tambahkan, edit dan hapus chat, serta mengatur histori chat realtime user.",
    },
  ];
  return (
    <AdminLayout>
      <section className="flex h-full w-full flex-wrap justify-between gap-5 pt-7 md:h-[400px] md:gap-0">
        {cards.map((card, index) => (
          <Link
            to={card.to}
            key={index}
            className="group flex h-36 w-full flex-col justify-center gap-3 rounded-md border bg-[url('/backgrounds/white.jpg')] bg-cover px-5 py-3 shadow-md hover:cursor-pointer hover:bg-[url('/backgrounds/white.jpg')] md:h-40 md:w-[48%] md:gap-1 xl:hover:bg-[url('/backgrounds/green.png')]"
          >
            {card.icon}
            <h1 className="font-bold">{card.title}</h1>
            <p
              className={`${card.title === "Manage Couses" ? "text-[9px]" : "text-[11px]"}  text-font-black-2 group-hover:text-font-black-3 md:text-[10px] lg:text-[11px] xl:text-xs`}
            >
              {card.desc}
            </p>
          </Link>
        ))}
      </section>
    </AdminLayout>
  );
};
