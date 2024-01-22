import { FC, ReactElement } from "react";

export const ImgLogin: FC = (): ReactElement => {
  return (
    <section className="grid h-full w-3/5 place-items-center">
      <img
        src="/illustration/login.png"
        alt="login"
        className="h-full w-full object-cover"
      />
    </section>
  );
};
