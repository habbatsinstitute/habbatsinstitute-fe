import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { getAccessToken } from "@/lib";

export const Footer: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  return (
    <footer className={twMerge("flex h-[258px] w-full bg-dark-2", className)}>
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
          <section className="flex text-sm text-font-white md:text-base">
            <p>© 2024 - Habbats Institute. All rights reserved.</p>
          </section>
        </section>
        <section className="flex h-full w-1/2 flex-col items-end">
          <section className="mt-[7%] hidden w-[80%] justify-evenly text-bright-2 md:mt-[20%] md:flex xl:mt-[7%]">
            <Link to={"/"}>Home</Link>
            <Link to={"/news"}>News</Link>
            <Link to={"/about-us"}>About</Link>
            {!getAccessToken() && <Link to={"/login"}>Login</Link>}
          </section>
          <p className="mr-0 mt-[30%] w-full text-xs text-font-white md:mt-[5%] md:w-4/5 md:text-base lg:mr-[10%] lg:w-[60%] xl:mr-[15%] xl:w-1/2">
            Arcamanik Endah Ruko 01 No.07 Bandung, Jawa Barat.
          </p>
        </section>
      </section>
    </footer>
  );
};
