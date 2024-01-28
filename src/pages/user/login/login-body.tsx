import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Button,
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from "@/components";
import { FC, ReactElement } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "./schema";
import * as z from "zod";

export const LoginBody: FC = (): ReactElement => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <section className="container flex h-[60%] w-full">
      <section className="flex h-full w-2/5 flex-col justify-center gap-10">
        <Card className="w-[400px] px-3 py-1">
          <CardHeader>
            <CardTitle>Login User</CardTitle>
            <CardDescription className="pt-3 text-xs">
              Silahkan masukan username dan password untuk mengakses fitur kamis
              dengan lengkap.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="ml-4 flex h-16 flex-col items-center">
                      <section className="flex w-full items-center gap-2">
                        <FormLabel className="pt-1">Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukan Username"
                            type="text"
                            className={
                              form.formState.errors.username
                                ? "border-red-400 placeholder:text-red-400"
                                : ""
                            }
                            {...field}
                          />
                        </FormControl>
                      </section>
                      <section className="w-full">
                        <p className="pl-20 text-xs font-bold text-red-400">
                          {form.formState.errors.username?.message}
                        </p>
                      </section>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="ml-4 flex h-16 flex-col items-center">
                      <section className="flex w-full items-center gap-2">
                        <FormLabel className="pt-1">Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukan password"
                            type="text"
                            className={
                              form.formState.errors.password
                                ? "border-red-400 placeholder:text-red-400"
                                : ""
                            }
                            {...field}
                          />
                        </FormControl>
                      </section>
                      <section className="w-full">
                        <p className="pl-20 text-xs font-bold text-red-400">
                          {form.formState.errors.password?.message}
                        </p>
                      </section>
                    </FormItem>
                  )}
                />
                <section className="mt-5 flex w-full justify-end pr-3">
                  <Button type="submit" disabled={!form.formState.isValid}>
                    Login Now
                  </Button>
                </section>
              </form>
            </Form>
          </CardContent>
        </Card>
        <section className="text-white">
          <p>
            Di sini, Anda akan menemukan bagaimana obat-obatan herbal
            tradisional bertemu dengan teknologi canggih, menciptakan solusi
            kesehatan yang revolusioner.
          </p>
        </section>
      </section>

      <section className="grid h-full w-3/5 place-items-center">
        <img
          src="/illustrations/login.png"
          alt="login"
          className="h-full w-full object-cover"
        />
      </section>
    </section>
  );
};
