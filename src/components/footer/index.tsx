import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export const Footer: FC = (): ReactElement => {
  return (
    <footer className="absolute bottom-0 flex h-[258px] w-full bg-dark-2">
      <section className="container flex w-full">
        <section className="flex h-full w-1/2 flex-col justify-evenly">
          <section className="flex flex-col gap-3 text-white">
            <img src="/logos/white.png" alt="logo" className="w-20" />
            <section className="flex gap-3">
              <FaInstagram />
              <FaTiktok />
              <AiOutlineFacebook />
            </section>
          </section>
          <section className="text-font-white">
            <p>© 2024 - Habbats Institute. All rights reserved.</p>
          </section>
        </section>
        <section className="flex h-full w-1/2 flex-col items-end">
          <section className="mt-[7%] flex w-[80%] justify-evenly text-bright-2">
            <Link to={"/"}>Home</Link>
            <Link to={"/news"}>News</Link>
            <Link to={"/about-us"}>About</Link>
            <Link to={"/login"}>Login</Link>
          </section>
          <p className="mr-[30%] mt-[5%] w-[40%] text-font-white">
            Arcamanik Endah Ruko 01 No.07 Bandung, Jawa Barat.
          </p>
        </section>
      </section>
    </footer>
  );
};
