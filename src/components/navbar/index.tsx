import { FC, ReactElement, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Slide, toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { FiLogIn, FiUsers } from "react-icons/fi";
import {
  LuHome,
  LuLoader2,
  LuLogIn,
  LuLogOut,
  LuMenu,
  LuMessageSquare,
  LuNewspaper,
  LuShoppingCart,
  LuUser,
} from "react-icons/lu";
import { GoBook } from "react-icons/go";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
  Skeleton,
} from "..";
import {
  getAccessToken,
  removeToken,
  useGetUserMe,
  useUpdateUser,
  userSchema,
} from "@/lib";

export const Navbar: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      confirmation_password: "",
    },
  });

  const path = window.location.pathname;
  const navigate = useNavigate();

  const { data, refetch, isLoading } = useGetUserMe();
  const { mutate, isPending } = useUpdateUser(data?.data.id);

  function onSubmit(values: z.infer<typeof userSchema>) {
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);

    mutate(formData, {
      onSuccess: () => {
        refetch();
        toast.success("Data user berhasil diupdate", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      },
      onError: () => {
        toast.error("Gagal update data user", {
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

  useEffect(() => {
    form.reset(data?.data);
  }, [form, form.reset, data?.data]);

  return (
    <nav
      className={twMerge(
        "fixed z-20 flex h-20 w-full items-center justify-between",
        className,
      )}
    >
      <div className="container flex items-center justify-between">
        <section className="cursor-pointer" onClick={() => navigate("/")}>
          <img
            src={
              path === "/login"
                ? "/new-logos/white.png"
                : "/new-logos/black.png"
            }
            alt="logo"
            className="w-10 md:w-12"
          />
        </section>
        {/* Mobile */}
        <section className="flex text-white lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <h1 className="flex items-center justify-center gap-3 text-base font-bold text-black md:text-xl">
                <LuMenu
                  className={`text-[2rem] ${path === "/login" ? "text-white" : "text-black"}`}
                />
              </h1>
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="bg-emerald-50 text-emerald-700"
            >
              <section className="flex h-full w-full flex-col">
                <section className="grid h-52 place-items-center">
                  <img
                    src="/new-logos/black.png"
                    alt="logo"
                    className="w-20 object-cover"
                  />
                </section>

                <section className="flex h-[60%] w-full flex-col">
                  <Link
                    to="/"
                    className={clsx(
                      "flex items-center justify-center gap-2 border-y border-slate-700 py-3 font-semibold",
                      {
                        "bg-emerald-700 text-white":
                          location.pathname === "/" ||
                          !location.pathname.startsWith("/"),
                      },
                    )}
                  >
                    <LuHome
                      className={clsx({
                        "text-emerald-700": !location.pathname.startsWith("/"),
                      })}
                    />
                    Home
                  </Link>

                  {getAccessToken() && (
                    <Link
                      to="/courses"
                      className={clsx(
                        "flex items-center justify-center gap-2 border-y border-slate-700 py-3 font-semibold",
                        {
                          "bg-emerald-700 text-white":
                            location.pathname.startsWith("/courses"),
                        },
                      )}
                    >
                      <GoBook
                        className={clsx({
                          "text-emerald-700":
                            !location.pathname.startsWith("/courses"),
                        })}
                      />
                      Courses
                    </Link>
                  )}

                  <Link
                    to="/news"
                    className={clsx(
                      "flex items-center justify-center gap-2 border-y border-slate-700 py-3 font-semibold",
                      {
                        "bg-emerald-700 text-white":
                          location.pathname.startsWith("/news"),
                      },
                    )}
                  >
                    <LuNewspaper
                      className={clsx({
                        "text-emerald-700":
                          !location.pathname.startsWith("/news"),
                      })}
                    />
                    News
                  </Link>

                  <Link
                    to="/about-us"
                    className={clsx(
                      "flex items-center justify-center gap-2 border-y border-slate-700 py-3 font-semibold",
                      {
                        "bg-emerald-700 text-white":
                          location.pathname.startsWith("/about-us"),
                      },
                    )}
                  >
                    <FiUsers
                      className={clsx({
                        "text-emerald-700":
                          !location.pathname.startsWith("/about-us"),
                      })}
                    />
                    About Us
                  </Link>

                  <div
                    className={clsx(
                      "flex items-center justify-center gap-2 border-y border-slate-700 py-3 font-semibold",
                    )}
                    onClick={() =>
                      toast.warn("This feature is still in development", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Slide,
                      })
                    }
                  >
                    <LuShoppingCart />
                    Products
                  </div>

                  <div
                    className={clsx(
                      "flex items-center justify-center gap-2 border-y border-slate-700 py-3 font-semibold",
                    )}
                    onClick={() =>
                      toast.warn("This feature is still in development", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Slide,
                      })
                    }
                  >
                    <LuMessageSquare />
                    Community
                  </div>

                  {!getAccessToken() && (
                    <Link
                      to="/login"
                      className={clsx(
                        "flex items-center justify-center gap-2 border-y border-slate-700 py-3 font-semibold",
                        {
                          "bg-emerald-700 text-white":
                            location.pathname.startsWith("/login"),
                        },
                      )}
                    >
                      <LuLogIn
                        className={clsx({
                          "text-emerald-700":
                            !location.pathname.startsWith("/login"),
                        })}
                      />
                      Login
                    </Link>
                  )}
                </section>

                {getAccessToken() && (
                  <section className="flex h-[20%] flex-col justify-center gap-3">
                    <section
                      className="flex flex-row-reverse items-center justify-center gap-3 px-2 py-1
                "
                    >
                      {isLoading ? (
                        <Skeleton className="h-7 w-24 bg-emerald-200" />
                      ) : (
                        <h3 className="text-base font-normal ">
                          Hello, {data?.data.username.substring(0, 9)}
                        </h3>
                      )}
                      <Avatar>
                        <AvatarImage
                          src="https://www.reshot.com/preview-assets/icons/F3N5JXHBEG/user-F3N5JXHBEG.svg"
                          alt="user"
                        />
                        <AvatarFallback>
                          <Skeleton className="h-10 w-10 rounded-full bg-emerald-200" />
                        </AvatarFallback>
                      </Avatar>
                    </section>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center justify-center gap-3 py-1 hover:cursor-pointer hover:bg-emerald-200">
                          <LuUser />
                          Profile User
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                          >
                            <div className="flex flex-col">
                              <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem className="flex w-full flex-col">
                                    <FormLabel
                                      className={`text-sm ${form.formState.errors.username ? "text-red-400" : "text-[#0F172A]"}`}
                                    >
                                      Username
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        placeholder="Input username"
                                        className={
                                          form.formState.errors.username
                                            ? "border-red-400 placeholder:text-red-400"
                                            : ""
                                        }
                                        disabled={isPending}
                                        {...field}
                                      />
                                    </FormControl>
                                    <section className="w-full">
                                      <p className="text-xs font-bold text-red-400">
                                        {
                                          form.formState.errors.username
                                            ?.message
                                        }
                                      </p>
                                    </section>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem className="flex w-full flex-col">
                                    <FormLabel
                                      className={`text-sm ${form.formState.errors.password ? "text-red-400" : "text-[#0F172A]"}`}
                                    >
                                      Password
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="password"
                                        placeholder="Input password"
                                        className={
                                          form.formState.errors.password
                                            ? "border-red-400 placeholder:text-red-400"
                                            : ""
                                        }
                                        disabled={isPending}
                                        {...field}
                                      />
                                    </FormControl>
                                    <section className="w-full">
                                      <p className="text-xs font-bold text-red-400">
                                        {
                                          form.formState.errors.password
                                            ?.message
                                        }
                                      </p>
                                    </section>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="confirmation_password"
                                render={({ field }) => (
                                  <FormItem className="flex w-full flex-col">
                                    <FormLabel
                                      className={`text-sm ${form.formState.errors.confirmation_password ? "text-red-400" : "text-[#0F172A]"}`}
                                    >
                                      Confirmation Password
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="password"
                                        placeholder="Input confirmation password"
                                        className={
                                          form.formState.errors
                                            .confirmation_password
                                            ? "border-red-400 placeholder:text-red-400"
                                            : ""
                                        }
                                        disabled={isPending}
                                        {...field}
                                      />
                                    </FormControl>
                                    <section className="w-full">
                                      <p className="text-xs font-bold text-red-400">
                                        {
                                          form.formState.errors
                                            .confirmation_password?.message
                                        }
                                      </p>
                                    </section>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex justify-end gap-3">
                              <DialogClose asChild>
                                <Button type="button" variant={"outline"}>
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button
                                type="submit"
                                disabled={isPending || !form.formState.isValid}
                                className="flex items-center justify-center gap-2"
                              >
                                {isPending && (
                                  <LuLoader2 className="w-full animate-spin" />
                                )}
                                Save Changes
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={"destructive"}
                          className="items flex items-center justify-center gap-2"
                        >
                          <LuLogOut />
                          Logout
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to log out?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will end your session, while your
                            account data is securely stored on our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-400 hover:bg-red-500"
                            onClick={() => {
                              removeToken();
                              window.location.reload();
                            }}
                          >
                            Logout
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </section>
                )}
              </section>
            </SheetContent>
          </Sheet>
        </section>
        {/* MD - Desktop */}
        <section className="hidden lg:flex">
          <ul className="flex gap-5 font-bold">
            <li>
              <Link
                to="/"
                className={`flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 ${path === "/" ? "underline underline-offset-8" : ""} hover:bg-dark-1 hover:text-bright-1`}
              >
                Home
              </Link>
            </li>
            {getAccessToken() && (
              <li>
                <Link
                  to="/courses"
                  className={`flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 hover:bg-dark-1 hover:text-bright-1 ${path === "/courses" ? "underline underline-offset-8" : ""}`}
                >
                  Course
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/news"
                className={`flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 hover:bg-dark-1 hover:text-bright-1 ${path === "/news" ? "underline underline-offset-8" : ""}`}
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className={`flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 hover:bg-dark-1 hover:text-bright-1 ${path === "/about-us" ? "underline underline-offset-8" : ""}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <div
                className={`flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 hover:cursor-pointer hover:bg-dark-1 hover:text-bright-1`}
                onClick={() => {
                  toast.warn("This feature is still in development", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                  });
                }}
              >
                Products
              </div>
            </li>
            <li>
              <div
                className={`flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 hover:cursor-pointer hover:bg-dark-1 hover:text-bright-1`}
                onClick={() => {
                  toast.warn("This feature is still in development", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                  });
                }}
              >
                Community
              </div>
            </li>

            {getAccessToken() ? (
              <Popover>
                <PopoverTrigger>
                  <section className="flex items-center justify-center gap-3 rounded-md px-2">
                    {isLoading ? (
                      <Skeleton className="h-7 w-24 bg-emerald-200" />
                    ) : (
                      <h3 className="text-base font-normal ">
                        Hello, {data?.data.username.substring(0, 9)}
                      </h3>
                    )}
                    <Avatar>
                      <AvatarImage
                        src="https://www.reshot.com/preview-assets/icons/F3N5JXHBEG/user-F3N5JXHBEG.svg"
                        alt="user"
                      />
                      <AvatarFallback>
                        <Skeleton className="h-10 w-10 rounded-full bg-emerald-200" />
                      </AvatarFallback>
                    </Avatar>
                  </section>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] p-0">
                  <section className="flex w-full flex-col gap-2 text-slate-700">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex items-center justify-center gap-3 py-1 hover:cursor-pointer hover:bg-emerald-200">
                          <LuUser />
                          Profile User
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                          >
                            <div className="flex flex-col">
                              <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem className="flex w-full flex-col">
                                    <FormLabel
                                      className={`text-sm ${form.formState.errors.username ? "text-red-400" : "text-[#0F172A]"}`}
                                    >
                                      Username
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        placeholder="Input username"
                                        className={
                                          form.formState.errors.username
                                            ? "border-red-400 placeholder:text-red-400"
                                            : ""
                                        }
                                        disabled={isPending}
                                        {...field}
                                      />
                                    </FormControl>
                                    <section className="w-full">
                                      <p className="text-xs font-bold text-red-400">
                                        {
                                          form.formState.errors.username
                                            ?.message
                                        }
                                      </p>
                                    </section>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem className="flex w-full flex-col">
                                    <FormLabel
                                      className={`text-sm ${form.formState.errors.password ? "text-red-400" : "text-[#0F172A]"}`}
                                    >
                                      Password
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="password"
                                        placeholder="Input password"
                                        className={
                                          form.formState.errors.password
                                            ? "border-red-400 placeholder:text-red-400"
                                            : ""
                                        }
                                        disabled={isPending}
                                        {...field}
                                      />
                                    </FormControl>
                                    <section className="w-full">
                                      <p className="text-xs font-bold text-red-400">
                                        {
                                          form.formState.errors.password
                                            ?.message
                                        }
                                      </p>
                                    </section>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="confirmation_password"
                                render={({ field }) => (
                                  <FormItem className="flex w-full flex-col">
                                    <FormLabel
                                      className={`text-sm ${form.formState.errors.confirmation_password ? "text-red-400" : "text-[#0F172A]"}`}
                                    >
                                      Confirmation Password
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="password"
                                        placeholder="Input confirmation password"
                                        className={
                                          form.formState.errors
                                            .confirmation_password
                                            ? "border-red-400 placeholder:text-red-400"
                                            : ""
                                        }
                                        disabled={isPending}
                                        {...field}
                                      />
                                    </FormControl>
                                    <section className="w-full">
                                      <p className="text-xs font-bold text-red-400">
                                        {
                                          form.formState.errors
                                            .confirmation_password?.message
                                        }
                                      </p>
                                    </section>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex justify-end gap-3">
                              <DialogClose asChild>
                                <Button type="button" variant={"outline"}>
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button
                                type="submit"
                                disabled={isPending || !form.formState.isValid}
                                className="flex items-center justify-center gap-2"
                              >
                                {isPending && (
                                  <LuLoader2 className="w-full animate-spin" />
                                )}
                                Save Changes
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div className="flex items-center justify-center gap-3 py-1 hover:cursor-pointer hover:bg-emerald-200">
                          <LuLogOut />
                          Logout
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to log out?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will end your session, while your
                            account data is securely stored on our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-400 hover:bg-red-500"
                            onClick={() => {
                              removeToken();
                              window.location.reload();
                            }}
                          >
                            Logout
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </section>
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                to={"/login"}
                className={`flex items-center justify-center gap-2 rounded-md bg-bright-1 px-4 py-2 hover:bg-dark-1 hover:text-bright-1 ${path === "/login" ? "underline underline-offset-8" : ""}`}
              >
                <FiLogIn />
                Login
              </Link>
            )}
          </ul>
        </section>
      </div>
    </nav>
  );
};
