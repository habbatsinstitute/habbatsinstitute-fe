import { FC, ReactElement } from "react";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer: FC = (): ReactElement => {
  return (
    <footer className="bg-dark-2 absolute bottom-0 flex h-[258px] w-full">
      <section className="flex h-full w-1/2 flex-col justify-evenly pl-[5vw]">
        <section className="flex flex-col gap-3 text-white">
          <img src="/logo/white.png" alt="logo" className="w-20" />
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
        <section className="text-bright-2 mt-[7%] flex w-[80%] justify-evenly">
          <Link to={"/"}>Home</Link>
          <Link to={"/news"}>News</Link>
          <Link to={"/about-us"}>About</Link>
          <Link to={"/login"}>Login</Link>
        </section>
        <p className="text-font-white mr-[5%] mt-[5%] w-[40%]">
          Arcamanik Endah Ruko 01 No.07 Bandung, Jawa Barat.
        </p>
      </section>
    </footer>
  );
};
