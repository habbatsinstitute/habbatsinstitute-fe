import { FC, ReactElement } from "react";
import { FiUsers } from "react-icons/fi";
import { GoBook } from "react-icons/go";
import { LuNewspaper } from "react-icons/lu";
import { PiDiamondsFour } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const navLinksData = [
  {
    to: "/dashboard",
    icon: <PiDiamondsFour className="text-bright-1" />,
    label: "Dashboard",
  },
  {
    to: "/dashboard/courses",
    icon: <GoBook className="text-bright-1" />,
    label: "Courses",
  },
  {
    to: "/dashboard/news",
    icon: <LuNewspaper className="text-bright-1" />,
    label: "News",
  },
  {
    to: "/dashboard/users",
    icon: <FiUsers className="text-bright-1" />,
    label: "Users",
  },
];

const getLinkClassName = (isActive: boolean) => {
  return `py-3 font-semibold gap-2 items-center border border-bright-1 flex pl-[30%] hover:bg-slate-800 items-center ${isActive ? "bg-white text-dark-3 hover:bg-white" : "text-white"}`;
};

export const SideBar: FC = (): ReactElement => {
  return (
    <aside className="flex h-full w-[20%] flex-col justify-between bg-font-black-1">
      <section className="grid h-40 place-items-center">
        <img src="/logos/bright.png" alt="logo" className="w-28 object-cover" />
      </section>

      <section className="flex h-full w-full flex-col">
        {navLinksData.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => getLinkClassName(isActive)}
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </section>

      <p className="mb-10 w-3/4 text-font-white opacity-50">
        © 2024 - Habbats Institute. All rights reserved.
      </p>
    </aside>
  );
};
