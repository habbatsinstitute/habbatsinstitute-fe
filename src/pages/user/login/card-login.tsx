import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  CardFooter,
  Button,
} from "@/components";
import { Label } from "@radix-ui/react-label";
import { FC, ReactElement } from "react";

export const CardLogin: FC = (): ReactElement => {
  return (
    <section className="flex h-full w-2/5 flex-col justify-center gap-10">
      <Card className="w-[400px] px-3 py-1">
        <CardHeader>
          <CardTitle>Login User</CardTitle>
          <CardDescription className="pt-1 text-xs">
            Silahkan masukan username dan password untuk mengakses fitur kamis
            dengan lengkap.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex items-center justify-center gap-2 space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input id="name" placeholder="Masukan Username" type="text" />
              </div>
              <div className="flex items-center justify-center gap-2 space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Masukan Password"
                  type="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex w-full justify-end">
          <Button>Login Now</Button>
        </CardFooter>
      </Card>
      <section className="text-white">
        <p>
          Di sini, Anda akan menemukan bagaimana obat-obatan herbal tradisional
          bertemu dengan teknologi canggih, menciptakan solusi kesehatan yang
          revolusioner.
        </p>
      </section>
    </section>
  );
};
