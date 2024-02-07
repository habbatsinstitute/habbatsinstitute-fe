import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Slide, toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Footer,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Navbar,
} from "@/components";
import {
  getUserRole,
  loginSchema,
  setAccessToken,
  setRefreshToken,
  useLogin,
} from "@/lib";

export const Login: FC = (): ReactElement => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const payload = new FormData();

    payload.append("username", values.username);
    payload.append("password", values.password);

    mutate(payload, {
      onSuccess: (response) => {
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);

        const role = getUserRole();

        role === "2" ? navigate("/dashboard") : navigate("/");
      },
      onError: () => {
        toast.error("Invalid username atau password", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      },
    });
  }
  return (
    <main className="flex h-auto w-full flex-col bg-[url('/backgrounds/green.png')] font-inter">
      {/* Header */}
      <Navbar />

      {/* Body */}
      <section className="container flex h-[500px] w-full md:h-[700px] xl:h-[450px]">
        <section className="flex h-full flex-col justify-center gap-5 md:w-full md:items-center xl:w-2/5 xl:justify-normal">
          <Card className="h-2/3 w-full md:h-[52%] md:w-[50%] lg:h-[47%] lg:w-[40%] xl:mt-[7%] xl:h-[70%] xl:w-[70%]">
            <CardHeader>
              <CardTitle>Login User</CardTitle>
              <CardDescription className="pt-3 text-xs">
                Silahkan masukan username dan password untuk mengakses fitur
                kami dengan lengkap.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="flex h-16 w-full flex-col items-center">
                        <section className="flex w-full items-center gap-2">
                          <FormLabel className="pt-1">Username</FormLabel>
                          <section className="w-full">
                            <FormControl className="w-full">
                              <Input
                                disabled={isPending}
                                placeholder="Masukan Username"
                                type="text"
                                className={`w-full
                                ${
                                  form.formState.errors.username
                                    ? "border-red-400 placeholder:text-red-400"
                                    : ""
                                }`}
                                {...field}
                              />
                            </FormControl>
                          </section>
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
                      <FormItem className="flex h-16 w-full flex-col items-center">
                        <section className="flex w-full items-center gap-2">
                          <FormLabel className="pr-1 pt-1">Password</FormLabel>
                          <section className="w-full">
                            <FormControl className="w-full">
                              <Input
                                disabled={isPending}
                                placeholder="Masukan password"
                                type="password"
                                className={`w-full
                              ${
                                form.formState.errors.password
                                  ? "border-red-400 placeholder:text-red-400"
                                  : ""
                              }`}
                                {...field}
                              />
                            </FormControl>
                          </section>
                        </section>
                        <section className="w-full">
                          <p className="pl-20 text-xs font-bold text-red-400">
                            {form.formState.errors.password?.message}
                          </p>
                        </section>
                      </FormItem>
                    )}
                  />
                  <section className="mt-2 flex w-full justify-end">
                    <Button
                      type="submit"
                      disabled={!form.formState.isValid || isPending}
                      className="flex gap-2"
                    >
                      {isPending && <Loader2 className="w-4 animate-spin" />}{" "}
                      Login Now
                    </Button>
                  </section>
                </form>
              </Form>
            </CardContent>
          </Card>
          <section className="mb-5 flex text-sm text-white md:justify-center lg:text-sm xl:mb-0 xl:w-3/4 xl:text-[0.7rem]">
            <p className="md:w-8/12 lg:w-1/2 lg:text-center xl:w-full xl:text-left">
              Di sini, Anda akan menemukan bagaimana obat-obatan herbal
              tradisional bertemu dengan teknologi canggih, menciptakan solusi
              kesehatan yang revolusioner.
            </p>
          </section>
        </section>

        <section className="hidden h-full w-3/5 justify-center xl:flex">
          <img
            src="/illustrations/login.png"
            alt="login"
            className="h-full w-11/12 object-cover"
          />
        </section>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};
