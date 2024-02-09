import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { FiUsers } from "react-icons/fi";
import { PiDiamondsFour } from "react-icons/pi";
import { GoBook } from "react-icons/go";
import { LuLogOut, LuMenu, LuNewspaper, LuUser, LuUsers } from "react-icons/lu";
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
  SideBar,
  Skeleton,
} from "@/components";
import { getAccessToken, removeToken, useGetUserMe } from "@/lib";

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  className = "",
}) => {
  const location = useLocation();

  const { data } = useGetUserMe();

  const navLinksData = [
    {
      to: "/dashboard",
      icon: (
        <PiDiamondsFour
          className={clsx({
            "text-bright-1": location.pathname !== "/dashboard",
            "text-dark-3": location.pathname === "/dashboard",
          })}
        />
      ),
      label: "Dashboard",
    },
    {
      to: "/dashboard/courses",
      icon: (
        <GoBook
          className={clsx({
            "text-bright-1":
              !location.pathname.startsWith("/dashboard/courses"),
          })}
        />
      ),
      label: "Courses",
    },
    {
      to: "/dashboard/news",
      icon: (
        <LuNewspaper
          className={clsx({
            "text-bright-1": !location.pathname.startsWith("/dashboard/news"),
          })}
        />
      ),
      label: "News",
    },
    {
      to: "/dashboard/users",
      icon: (
        <FiUsers
          className={clsx({
            "text-bright-1": !location.pathname.startsWith("/dashboard/users"),
          })}
        />
      ),
      label: "Users",
    },
  ];

  const linkItems = [
    { to: "/dashboard", icon: <LuUser />, label: "Profile Admin" },
    { to: "/dashboard/users", icon: <LuUsers />, label: "Manage Users" },
    { to: "/dashboard/courses", icon: <GoBook />, label: "Manage Courses" },
    { to: "/dashboard/news", icon: <LuNewspaper />, label: "Manage News" },
    { to: "/", icon: <LuLogOut />, label: "Log out" },
  ];

  const navTitle = (pathname: string): string => {
    const titleMap: { [key: string]: string } = {
      "/dashboard": "Dashboard",
      "/dashboard/courses": "Courses Manages",
      "/dashboard/courses/add": "Courses Manages",
      "/dashboard/courses/update": "Courses Manages",
      "/dashboard/news": "News Manages",
      "/dashboard/news/add": "News Manages",
      "/dashboard/news/update": "News Manages",
      "/dashboard/users": "Users Manages",
      "/dashboard/users/add": "Users Manages",
      "/dashboard/users/update": "Users Manages",
    };

    return titleMap[pathname] || "Dashboard";
  };

  return (
    <main className="flex h-auto w-full overflow-x-hidden overflow-y-hidden font-inter md:h-screen">
      <SideBar />
      <section className="h-auto w-full md:h-full md:w-[80%]">
        {/* Nav mobile */}
        <nav className="container fixed z-10 flex h-[78px] w-full items-center justify-between bg-white shadow-md md:hidden">
          <section className="flex items-center justify-center gap-3 text-base font-bold text-black md:hidden md:text-xl">
            <Sheet>
              <SheetTrigger asChild>
                <h1 className="flex items-center justify-center gap-3 text-base font-bold text-black md:text-xl">
                  <LuMenu className="flex text-[20px]" />
                  {navTitle(window.location.pathname)}
                </h1>
              </SheetTrigger>
              <SheetContent
                side={"left"}
                className="bg-font-black-1 text-white"
              >
                <section className="flex h-full w-full flex-col">
                  <section className="grid h-52 place-items-center">
                    <img
                      src="/logos/bright.png"
                      alt="logo"
                      className="w-28 object-cover"
                    />
                  </section>

                  <section className="flex h-[70%] w-full flex-col">
                    {navLinksData.map(({ to, icon, label }, index) => (
                      <Link
                        key={index}
                        to={to}
                        className={clsx(
                          "flex items-center justify-center gap-2 border-y border-bright-1 py-3 font-semibold",
                          {
                            "bg-light-2 text-dark-3":
                              location.pathname === to ||
                              (to === "/dashboard/courses" &&
                                location.pathname.startsWith(
                                  "/dashboard/courses",
                                )) ||
                              (to === "/dashboard/news" &&
                                location.pathname.startsWith(
                                  "/dashboard/news",
                                )) ||
                              (to === "/dashboard/users" &&
                                location.pathname.startsWith(
                                  "/dashboard/users",
                                )),
                            "text-font-white hover:bg-slate-800":
                              location.pathname !== to &&
                              !(
                                to === "/dashboard/courses" &&
                                location.pathname.startsWith(
                                  "/dashboard/courses",
                                )
                              ) &&
                              !(
                                to === "/dashboard/news" &&
                                location.pathname.startsWith("/dashboard/news")
                              ) &&
                              !(
                                to === "/dashboard/users" &&
                                location.pathname.startsWith("/dashboard/users")
                              ),
                            "pr-5": label === "Courses",
                            "pr-10": label === "News" || label === "Users",
                          },
                        )}
                      >
                        {icon}
                        {label}
                      </Link>
                    ))}
                  </section>
                  {getAccessToken() && (
                    <section className="flex h-[20%] flex-col justify-center gap-5">
                      <section
                        className="flex flex-row-reverse items-center justify-center gap-3 px-2 py-1
                "
                      >
                        <h3 className="text-base font-normal ">
                          Hello, {data?.data.username.substring(0, 9)}
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

          <section>
            <Popover>
              <PopoverTrigger>
                <section className="flex items-center justify-center gap-3 rounded-md px-3 py-2 hover:bg-slate-100">
                  <h3 className="text-base md:text-lg">
                    Hello, {data?.data.username}
                  </h3>
                  <img
                    src="/icons/avatar.png"
                    alt="avatar"
                    className="boder-black w-7 rounded-full border border-black p-1 md:w-10"
                  />
                </section>
              </PopoverTrigger>
              <PopoverContent className="w-[170px] p-0">
                <section className="flex h-full w-full flex-col gap-2 text-slate-700">
                  {linkItems.map((linkItem, index) => (
                    <Link
                      key={index}
                      to={linkItem.to}
                      className="flex items-center gap-3 px-2 py-3 pl-3 hover:bg-slate-200 md:px-0 md:py-1 md:pl-3"
                      onClick={() => {
                        if (linkItem.label === "Log out") {
                          removeToken();
                        }
                      }}
                    >
                      {linkItem.icon}
                      {linkItem.label}
                    </Link>
                  ))}
                </section>
              </PopoverContent>
            </Popover>
          </section>
        </nav>

        {/* Nav Desktop */}
        <nav className="container hidden h-[65px] w-full items-center justify-between md:flex">
          <section className="hidden items-center justify-center gap-3 text-base font-bold text-black md:flex md:text-xl">
            <h1 className="flex items-center justify-center gap-3 text-base font-bold text-black md:text-xl">
              {navTitle(window.location.pathname)}
            </h1>
          </section>
          <section>
            <Popover>
              <PopoverTrigger>
                <section className="flex items-center justify-center gap-3 rounded-md px-3 py-2 hover:bg-slate-100">
                  <h3 className="text-base md:text-lg">
                    Hello, {data?.data.username}
                  </h3>
                  <img
                    src="/icons/avatar.png"
                    alt="avatar"
                    className="boder-black w-7 rounded-full border border-black p-1 md:w-10"
                  />
                </section>
              </PopoverTrigger>
              <PopoverContent className="w-[170px] p-0">
                <section className="flex h-full w-full flex-col gap-2 text-slate-700">
                  {linkItems.map((linkItem, index) => (
                    <Link
                      key={index}
                      to={linkItem.to}
                      className="flex items-center gap-3 px-2 py-3 pl-3 hover:bg-slate-200 md:px-0 md:py-1 md:pl-3"
                      onClick={() => {
                        if (linkItem.label === "Log out") {
                          removeToken();
                        }
                      }}
                    >
                      {linkItem.icon}
                      {linkItem.label}
                    </Link>
                  ))}
                </section>
              </PopoverContent>
            </Popover>
          </section>
        </nav>
        <hr className="container h-1 w-[85%] text-[#E2E8F0] md:w-[95%]" />
        <section
          className={`container mt-[10vh] h-auto w-full md:mt-0 md:h-[85%] ${className}`}
        >
          {children}
        </section>
      </section>
    </main>
  );
};
