import { FC, ReactElement } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export const Navbar: FC = (): ReactElement => {
  const path = window.location.pathname;
  const navigate = useNavigate();

  const links = [
    { to: "/", text: "Home" },
    { to: "/news", text: "News" },
    { to: "/about-us", text: "About Us" },
    { to: "/login", text: "Login" },
  ];

  return (
    <nav className="my-5 flex h-[56px] w-full items-center justify-between">
      <section className="cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={path === "/login" ? "logos/white.png" : "logos/black.png"}
          alt="logo"
          className="w-24"
        />
      </section>
      <section className="flex">
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
