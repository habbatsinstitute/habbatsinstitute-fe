import { GoBook } from "react-icons/go";
import { LuNewspaper, LuUsers } from "react-icons/lu";
import { PiChatCircle } from "react-icons/pi";

export const cards = [
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
