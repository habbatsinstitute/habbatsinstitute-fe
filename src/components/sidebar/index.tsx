import { FC, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { GoBook } from "react-icons/go";
import { LuNewspaper } from "react-icons/lu";
import { PiDiamondsFour } from "react-icons/pi";
import clsx from "clsx";

export const SideBar: FC = (): ReactElement => {
  const location = useLocation();

  const navLinksData = [
    {
      to: "/dashboard",
      icon: (
        <PiDiamondsFour
          className={clsx({
            "text-bright-1": location.pathname !== "/dashboard",
            "text-dark-3": location.pathname === "/dashboard",
          })}
        />
      ),
      label: "Dashboard",
    },
    {
      to: "/dashboard/courses",
      icon: (
        <GoBook
          className={clsx({
            "text-bright-1":
              !location.pathname.startsWith("/dashboard/courses"),
          })}
        />
      ),
      label: "Courses",
    },
    {
      to: "/dashboard/news",
      icon: (
        <LuNewspaper
          className={clsx({
            "text-bright-1": !location.pathname.startsWith("/dashboard/news"),
          })}
        />
      ),
      label: "News",
    },
    {
      to: "/dashboard/users",
      icon: (
        <FiUsers
          className={clsx({
            "text-bright-1": !location.pathname.startsWith("/dashboard/users"),
          })}
        />
      ),
      label: "Users",
    },
  ];

  return (
    <aside className="hidden min-h-full flex-col justify-between bg-font-black-1 md:flex md:w-[30%] xl:w-[20%]">
      <section className="grid h-52 place-items-center">
        <img src="/new-logos/bright.png" alt="logo" className="object-cover" />
      </section>

      <section className="flex h-full w-full flex-col">
        {navLinksData.map(({ to, icon, label }, index) => (
          <Link
            key={index}
            to={to}
            className={clsx(
              "flex items-center justify-center gap-2 border-y border-bright-1 py-3 font-semibold",
              {
                "bg-light-2 text-dark-3":
                  location.pathname === to ||
                  (to === "/dashboard/courses" &&
                    location.pathname.startsWith("/dashboard/courses")) ||
                  (to === "/dashboard/news" &&
                    location.pathname.startsWith("/dashboard/news")) ||
                  (to === "/dashboard/users" &&
                    location.pathname.startsWith("/dashboard/users")),
                "text-font-white hover:bg-slate-800":
                  location.pathname !== to &&
                  !(
                    to === "/dashboard/courses" &&
                    location.pathname.startsWith("/dashboard/courses")
                  ) &&
                  !(
                    to === "/dashboard/news" &&
                    location.pathname.startsWith("/dashboard/news")
                  ) &&
                  !(
                    to === "/dashboard/users" &&
                    location.pathname.startsWith("/dashboard/users")
                  ),
                "pr-5": label === "Courses",
                "pr-10": label === "News" || label === "Users",
              },
            )}
          >
            {icon}
            {label}
          </Link>
        ))}
      </section>

      <p className="mb-10 w-[80%] pl-[10%] text-[10px] text-font-white opacity-50 xl:text-base">
        © 2024 - Habbats Institute. All rights reserved.
      </p>
    </aside>
  );
};
