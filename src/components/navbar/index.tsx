import { FC, ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { FiLogIn, FiUsers } from "react-icons/fi";
import { LuHome, LuLogIn, LuMenu, LuNewspaper } from "react-icons/lu";
import { GoBook } from "react-icons/go";
import { Sheet, SheetContent, SheetTrigger } from "..";

export const Navbar: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  const path = window.location.pathname;
  const navigate = useNavigate();

  const links = [
    { to: "/", text: "Home" },
    { to: "/news", text: "News" },
    { to: "/about-us", text: "About Us" },
    { to: "/login", text: "Login" },
  ];

  const navLinksMobile = [
    {
      to: "/",
      icon: (
        <LuHome
          className={clsx({
            "text-teal-700": location.pathname.startsWith("/"),
          })}
        />
      ),
      label: "Home",
    },
    {
      to: "/courses",
      icon: (
        <GoBook
          className={clsx({
            "text-teal-700": !location.pathname.startsWith("/courses"),
          })}
        />
      ),
      label: "Courses",
    },
    {
      to: "news",
      icon: (
        <LuNewspaper
          className={clsx({
            "text-teal-700": !location.pathname.startsWith("/news"),
          })}
        />
      ),
      label: "News",
    },
    {
      to: "/about-us",
      icon: (
        <FiUsers
          className={clsx({
            "text-teal-700": !location.pathname.startsWith("/about-us"),
          })}
        />
      ),
      label: "About Us",
    },
    {
      to: "/login",
      icon: (
        <LuLogIn
          className={clsx({
            "text-teal-700": !location.pathname.startsWith("/login"),
          })}
        />
      ),
      label: "Login",
    },
  ];

  return (
    <nav
      className={twMerge(
        "container my-5 flex h-[56px] w-full items-center justify-between",
        className,
      )}
    >
      <section className="cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={path === "/login" ? "/logos/white.png" : "/logos/black.png"}
          alt="logo"
          className="w-24"
        />
      </section>
      {/* Mobile */}
      <section className="flex text-white md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <h1 className="flex items-center justify-center gap-3 text-base font-bold text-black md:text-xl">
              <LuMenu className="text-[2rem] text-white" />
            </h1>
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-teal-50 text-teal-700">
            <section className="flex h-full w-full flex-col">
              <section className="grid h-52 place-items-center">
                <img
                  src="/new-logos/black.png"
                  alt="logo"
                  className="w-20 object-cover"
                />
              </section>

              <section className="flex h-full w-full flex-col">
                {navLinksMobile.map(({ to, icon, label }, index) => (
                  <Link
                    key={index}
                    to={to}
                    className={clsx(
                      "flex items-center justify-center gap-2 border-y border-slate-700 py-3 font-semibold",
                      {
                        "bg-teal-700 text-white":
                          location.pathname === to ||
                          (to === "/" && !location.pathname.startsWith("/")) ||
                          (to === "/courses" &&
                            location.pathname.startsWith("/courses")) ||
                          (to === "/news" &&
                            location.pathname.startsWith("/news")) ||
                          (to === "/about-us" &&
                            location.pathname.startsWith("/about-us")) ||
                          (to === "/login" &&
                            location.pathname.startsWith("/login")),
                      },
                    )}
                  >
                    {icon}
                    {label}
                  </Link>
                ))}
              </section>
            </section>
          </SheetContent>
        </Sheet>
      </section>
      {/* MD - Desktop */}
      <section className="hidden md:flex">
        <ul className="flex gap-5 font-bold">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                className={`flex items-center justify-center gap-1 rounded-md hover:bg-dark-1 hover:text-bright-1 ${link.text === "Login" ? "bg-bright-1 underline underline-offset-2" : "bg-white"}  px-4 py-2`}
              >
                {link.text} {link.text === "Login" && <FiLogIn />}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
};
