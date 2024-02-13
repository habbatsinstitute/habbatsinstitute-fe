import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button } from "..";
import { getAccessToken } from "@/lib";

interface ConsultantProps {
  className?: string;
}

export const Consultant: FC<ConsultantProps> = ({
  className,
}): ReactElement => {
  const navigate = useNavigate();

  return (
    <section
      className={twMerge(
        "flex w-full flex-col items-center justify-center bg-light-2",
        className,
      )}
    >
      <div className="flex h-[250px] w-full bg-[url('/backgrounds/green.png')] bg-cover lg:h-[300px]">
        <div className="container flex">
          <div className="flex w-full flex-col justify-center gap-3 md:w-1/2">
            <h3 className="text-base font-bold text-font-black-3 md:text-lg lg:text-2xl">
              Dapatkan konsultasi kesehatan yang terpercaya dengan tim ahli
              medis kami, siap membantu Anda menemukan solusi terbaik untuk
              kesehatan Anda.
            </h3>
            <div>
              <Button
                onClick={() =>
                  getAccessToken() ? navigate("/courses") : navigate("/login")
                }
              >
                Konsultasi Sekarang
              </Button>
            </div>
          </div>
          <div className="hidden w-1/2 items-center justify-center md:flex">
            <img
              src="/illustrations/doctor.png"
              alt="doctor"
              className="relative scale-90 md:bottom-[12%] lg:bottom-[21%] xl:bottom-[27.5%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
