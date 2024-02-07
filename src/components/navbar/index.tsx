import { FC, ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { FiLogIn, FiUsers } from "react-icons/fi";
import {
  LuHome,
  LuLogIn,
  LuLogOut,
  LuMenu,
  LuNewspaper,
  LuUser,
  LuUserCog2,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
  Skeleton,
} from "..";
import { getAccessToken, removeToken, useGetUserMe } from "@/lib";

export const Navbar: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  const path = window.location.pathname;
  const navigate = useNavigate();

  const { data } = useGetUserMe();

  return (
    <nav
      className={twMerge(
        "container my-5 flex h-[56px] w-full items-center justify-between",
        className,
      )}
    >
      <section className="cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={
            path === "/login" ? "/new-logos/white.png" : "/new-logos/black.png"
          }
          alt="logo"
          className="w-10 md:w-12"
        />
      </section>
      {/* Mobile */}
      <section className="flex text-white md:hidden">
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
                <section className="flex h-[20%] flex-col justify-center gap-5">
                  <section
                    className="flex flex-row-reverse items-center justify-center gap-3 px-2 py-1
                "
                  >
                    <h3 className="text-base font-normal ">
                      Hello, {data?.data.username}
                    </h3>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        <Skeleton className="h-10 w-10 rounded-full bg-slate-300" />
                      </AvatarFallback>
                    </Avatar>
                  </section>
                  <Link
                    to={"/"}
                    className="items flex items-center justify-center gap-2"
                  >
                    <LuUserCog2 />
                    Profile User
                  </Link>
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
                          This action will end your session, while your account
                          data is securely stored on our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500"
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
      <section className="hidden md:flex">
        <ul className="flex gap-5 font-bold">
          <li>
            <Link
              to="/"
              className={`flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 hover:bg-dark-1 hover:text-bright-1`}
            >
              Home
            </Link>
          </li>
          {getAccessToken() && (
            <li>
              <Link
                to="/courses"
                className={`flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 hover:bg-dark-1 hover:text-bright-1`}
              >
                Course
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/news"
              className={`flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 hover:bg-dark-1 hover:text-bright-1`}
            >
              News
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className={`flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 hover:bg-dark-1 hover:text-bright-1`}
            >
              About Us
            </Link>
          </li>

          {getAccessToken() ? (
            <Popover>
              <PopoverTrigger>
                <section className="flex items-center justify-center gap-3 rounded-md px-2">
                  <h3 className="text-base font-normal ">
                    Hello, {data?.data.username}
                  </h3>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      <Skeleton className="h-10 w-10 rounded-full bg-slate-300" />
                    </AvatarFallback>
                  </Avatar>
                </section>
              </PopoverTrigger>
              <PopoverContent className="w-[150px] p-0">
                <section className="flex w-full flex-col gap-2 text-slate-700">
                  <Link
                    to={"/"}
                    className="flex items-center justify-center gap-3 py-1 hover:bg-slate-300"
                  >
                    <LuUser />
                    Profile User
                  </Link>
                  <Link
                    to={"/"}
                    className="flex items-center justify-center gap-3 py-1 hover:bg-slate-300"
                    onClick={() => {
                      removeToken();
                      window.location.reload();
                    }}
                  >
                    <LuLogOut />
                    Logout
                  </Link>
                </section>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              to={"/login"}
              className="flex items-center justify-center gap-2 rounded-md bg-bright-1 px-4 py-2 hover:bg-dark-1 hover:text-bright-1"
            >
              <FiLogIn />
              Login
            </Link>
          )}
        </ul>
      </section>
    </nav>
  );
};
