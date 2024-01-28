import { FC, ReactElement } from "react";
import { LoginBody } from "./login-body";
import { LoginFooter } from "./login-footer";
import { LoginHeader } from "./login-header";

export const Login: FC = (): ReactElement => {
  return (
    <main className="relative flex h-[850px] w-full flex-col bg-[url('/backgrounds/green.png')] font-inter">
      <LoginHeader />
      <LoginBody />
      <LoginFooter />
    </main>
  );
};
