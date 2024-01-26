import { Popover, PopoverContent, PopoverTrigger, SideBar } from "@/components";
import { GoBook } from "react-icons/go";
import { LuLogOut, LuNewspaper, LuUser, LuUsers } from "react-icons/lu";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  className = "",
}) => {
  const navTitle = (pathname: string): string => {
    const titleMap: { [key: string]: string } = {
      "/dashboard": "Dashboard",
      "/dashboard/courses": "Courses Manages",
      "/dashboard/news": "News Manages",
      "/dashboard/users": "Users Manages",
    };

    return titleMap[pathname] || "Dashboard";
  };

  return (
    <main className="flex h-screen w-full overflow-x-hidden overflow-y-hidden font-inter">
      <SideBar />
      <section className="h-full w-[80%]">
        <nav className="container flex h-[78px] w-full items-center justify-between">
          <h1 className="text-xl font-bold text-black">
            {navTitle(window.location.pathname)}
          </h1>
          <section>
            <Popover>
              <PopoverTrigger>
                <section className="flex items-center justify-center gap-3 rounded-md px-3 py-2 hover:bg-slate-100">
                  <h3 className="text-lg">Hello, Admin</h3>
                  <img
                    src="/icons/avatar.png"
                    alt="avatar"
                    className="boder-black w-10 rounded-full border border-black p-1"
                  />
                </section>
              </PopoverTrigger>
              <PopoverContent className="w-[170px] p-0">
                <section className="flex h-full w-full flex-col gap-2 text-slate-700">
                  <Link
                    to={"/admin/profile"}
                    className="flex items-center gap-3 py-1 pl-3 hover:bg-slate-200"
                  >
                    <LuUser />
                    Profile Admin
                  </Link>
                  <Link
                    to={"/admin/users"}
                    className="flex items-center gap-3 py-1 pl-3 hover:bg-slate-200"
                  >
                    <LuUsers />
                    Manage Users
                  </Link>
                  <Link
                    to={"/admin/courses"}
                    className="flex items-center gap-3 py-1 pl-3 hover:bg-slate-200"
                  >
                    <GoBook />
                    Manage Courses
                  </Link>
                  <Link
                    to={"/admin/news"}
                    className="flex items-center gap-3 py-1 pl-3 hover:bg-slate-200"
                  >
                    <LuNewspaper />
                    Manage News
                  </Link>
                  <Link
                    to={"/"}
                    className="flex items-center gap-3  py-1 pl-3 hover:bg-slate-200"
                  >
                    <LuLogOut />
                    Log out
                  </Link>
                </section>
              </PopoverContent>
            </Popover>
          </section>
        </nav>
        <hr className="container h-1 w-[95%] text-[#E2E8F0]" />
        <section className={`container h-[85%] w-full ${className}`}>
          {children}
        </section>
      </section>
    </main>
  );
};
