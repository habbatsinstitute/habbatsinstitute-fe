import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Slide, toast } from "react-toastify";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  LuTrash,
  LuSave,
  LuPenLine,
  LuLoader2,
  LuSearch,
  LuX,
} from "react-icons/lu";
import {
  AdminLayout,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Calendar,
  DataTable,
  Input,
  Label,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import {
  TGetAllUsersResponse,
  TGetUserByIdResponse,
  TPaging,
  TUser,
  api,
  cn,
  useRemoveUser,
  useUpdateUser,
} from "@/lib";

export const DashboardUsersManage: FC = (): ReactElement => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [usersById, setUsersById] = useState<TUser>({
    expiry_date: "",
    id: 0,
    username: "",
    role_id: 0,
  });
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [loadingUsersById, setLoadingUsersById] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmation_password: "",
  });
  const [paging, setPaging] = useState<TPaging>({
    previous_page: 0,
    current_page: 1,
    next_page: 0,
    page_size: 5,
    total_page: 0,
    total_data: 0,
  });
  const [search, setSearch] = useState<string>("");

  const { id } = useParams();

  const { mutate: update, isPending: isPendingUpdate } = useUpdateUser(id);
  const { mutate: remove, isPending: isPendingRemove } = useRemoveUser();

  const navigate = useNavigate();

  const getUsers = async (
    page: number = paging.current_page || 1,
    pageSize: number = 5,
  ) => {
    try {
      setLoadingUsers(true);
      const { data } = await api.get<TGetAllUsersResponse>("/users", {
        params: {
          page,
          page_size: pageSize,
        },
      });
      setUsers(data?.data);
      setPaging(data?.pagination);
    } catch (error) {
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const getUsersById = async () => {
    try {
      setLoadingUsersById(true);
      const { data } = await api.get<TGetUserByIdResponse>(`/users/${id}`);
      setUsersById(data?.data);
    } catch (error) {
      setUsersById({
        expiry_date: "",
        id: 0,
        username: "",
        role_id: 0,
      });
    } finally {
      setLoadingUsersById(false);
    }
  };

  const searchUsers = async () => {
    try {
      setLoadingUsers(true);
      const { data } = await api.get<TGetAllUsersResponse>(
        `/users/find?username=${search}`,
      );
      setUsers(data?.data);
      setPaging(data?.pagination);
    } catch (error) {
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsersById();
  }, [id]);

  useEffect(() => {
    setForm({
      username: usersById?.username,
      password: "",
      confirmation_password: "",
    });
    setDate(usersById.expiry_date as Date);
  }, [usersById]);

  useEffect(() => {
    searchUsers();
  }, [search]);

  const handlePageChange = (page: number) => {
    getUsers(page);
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("username", form.username);
    if (form.password) {
      formData.append("password", form.password);
    }
    if (date) {
      const dateString = new Date(date).toISOString();
      formData.append("expiry_date", dateString);
    }

    update(formData, {
      onSuccess: () => {
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
        navigate("/dashboard/users");
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

  const columns: ColumnDef<TUser>[] = [
    {
      header: "No",
      cell: (cell) =>
        (paging.current_page - 1) * paging.page_size + cell.row.index + 1,
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "option",
      header: "Opsi",
      cell: (cell) => (
        <section className="flex w-full justify-center py-2">
          <Button
            className="flex h-7 w-28 items-center justify-center gap-1 rounded-md bg-bright-2 text-font-black-3 hover:bg-bright-1"
            onClick={() => {
              navigate(`/dashboard/users/manage/${cell.row.original.id}`);
            }}
            disabled={loadingUsersById || isPendingUpdate || isPendingRemove}
          >
            {loadingUsersById || isPendingUpdate || isPendingRemove ? (
              <Loader2 className="w-4 animate-spin" />
            ) : (
              <Fragment>
                <LuPenLine className="text-xl" />
                Manage
              </Fragment>
            )}
          </Button>
        </section>
      ),
    },
  ];

  return (
    <AdminLayout>
      <section className="flex min-h-[500px] w-full flex-col justify-between gap-10 pt-7 md:gap-0 xl:min-h-[510px] xl:flex-row">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="container flex h-full w-full flex-col justify-evenly gap-3 rounded-md border py-5 lg:gap-0 xl:w-[48%] xl:py-0"
        >
          <h1 className="mt-5 text-lg font-black text-[#0F172A]">Edit User</h1>
          <p className="w-3/4 text-xs text-[#64748B]">
            Untuk menambah data user, isi form input dibawah dengan benar.
          </p>

          <div className="flex w-full flex-col">
            <Label
              htmlFor="username"
              className={`text-sm ${
                form.username?.length >= 1 && form.username?.length <= 5
                  ? "text-red-400"
                  : "text-[#0F172A]"
              }`}
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Input username"
              className={
                form.username?.length >= 1 && form.username?.length <= 5
                  ? "border-red-400 placeholder:text-red-400"
                  : ""
              }
              disabled={loadingUsersById}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
              }}
              value={form.username}
            />
            {form.username?.length >= 1 && form.username?.length <= 5 && (
              <section className="w-full">
                <p className="text-xs font-bold text-red-400">
                  Username minimal 6 karakter
                </p>
              </section>
            )}
          </div>
          <div className="flex w-full flex-col">
            <Label
              className={`text-sm ${
                form.password.length >= 1 && form.password.length <= 8
                  ? "text-red-400"
                  : "text-[#0F172A]"
              }`}
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Input password"
              className={
                form.password.length >= 1 && form.password.length <= 8
                  ? "border-red-400 placeholder:text-red-400"
                  : ""
              }
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              disabled={loadingUsersById}
            />
            {form.password.length >= 1 && form.password.length <= 8 && (
              <section className="w-full">
                <p className="text-xs font-bold text-red-400">
                  Password minimal 8 karakter
                </p>
              </section>
            )}
          </div>
          <div className="flex w-full flex-col">
            <Label
              htmlFor="confirm-password"
              className={`text-sm ${
                form.confirmation_password.length >= 1 &&
                form.confirmation_password.length <= 8
                  ? "text-red-400"
                  : "text-[#0F172A]"
              }`}
            >
              Confirmation Password
            </Label>
            <Input
              id="confirmation_password"
              type="password"
              placeholder="Input confirmation password"
              className={
                form.confirmation_password.length >= 1 &&
                form.confirmation_password.length <= 8
                  ? "border-red-400 placeholder:text-red-400"
                  : ""
              }
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  confirmation_password: e.target.value,
                }));
              }}
              disabled={loadingUsersById}
            />
            {form.confirmation_password.length >= 1 &&
              form.confirmation_password.length <= 8 && (
                <section className="w-full">
                  <p className="text-xs font-bold text-red-400">
                    Konfirmasi password minimal 8 karakter
                  </p>
                </section>
              )}
            {form.password !== form.confirmation_password &&
              form.confirmation_password &&
              !(
                form.confirmation_password.length >= 1 &&
                form.confirmation_password.length <= 8
              ) && (
                <section className="w-full">
                  <p className="text-xs font-bold text-red-400">
                    Konfirmasi password harus sama
                  </p>
                </section>
              )}
          </div>
          <section className="my-5 flex w-full flex-col justify-between gap-1">
            <hr className="h-1 w-full" />
            <Label
              htmlFor="confirm-password"
              className="text-sm text-[#0F172A]"
            >
              Expiration Account
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  disabled={loadingUsersById}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </section>
          <section className="flex w-full justify-end gap-2 py-2">
            <Button
              size={"sm"}
              type="button"
              disabled={isPendingUpdate || isPendingRemove || loadingUsersById}
              onClick={() => navigate("/dashboard/users")}
            >
              {loadingUsersById || isPendingUpdate || isPendingRemove ? (
                <LuLoader2 className="w-14 animate-spin" />
              ) : (
                "Cancel"
              )}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  className="flex gap-1"
                  type="button"
                  disabled={
                    isPendingUpdate || isPendingRemove || loadingUsersById
                  }
                >
                  {loadingUsersById || isPendingUpdate || isPendingRemove ? (
                    <LuLoader2 className="w-14 animate-spin" />
                  ) : (
                    <Fragment>
                      Delete
                      <LuTrash />
                    </Fragment>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <span className="font-bold text-font-black-1">
                      Apakah anda yakin ingin menghapus data ini ?
                    </span>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-dark-3">
                    <div className="h-full w-[450px] break-words">
                      Anda akan menghapus data username{" "}
                      <span className="font-bold">"{usersById.username}"</span>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-[#DC5E5E] hover:bg-red-400"
                    onClick={() =>
                      remove(id, {
                        onSuccess: () => {
                          toast.success("Data user berhasil dihapus", {
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
                          navigate("/dashboard/users");
                        },
                        onError: () => {
                          toast.error("Gagal menghapus data user", {
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
                      })
                    }
                  >
                    Delete data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              size={"sm"}
              type="submit"
              className="gap-1 bg-bright-2 font-bold text-font-black-3 hover:bg-bright-1"
              disabled={
                loadingUsersById ||
                isPendingUpdate ||
                isPendingRemove ||
                !date ||
                (form.password.length >= 1 && form.password.length <= 8) ||
                (form.confirmation_password.length >= 1 &&
                  form.confirmation_password.length <= 8) ||
                form.password !== form.confirmation_password
              }
            >
              {(isPendingRemove || loadingUsersById || isPendingUpdate) && (
                <LuLoader2 className="mx-7 w-full animate-spin" />
              )}
              {!isPendingRemove && !loadingUsersById && !isPendingUpdate && (
                <Fragment>
                  Save <LuSave className="text-lg" />
                </Fragment>
              )}
            </Button>
          </section>
        </form>

        <section className="flex h-full w-full flex-col gap-3 py-10 md:mt-10 lg:py-0 xl:mt-0 xl:w-[48%]">
          <div className="flex w-full items-center gap-3">
            <div className="relative flex w-full items-center">
              <LuSearch className="absolute ml-3 text-slate-500" />
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="Cari pengguna"
                  className="pl-9 pr-7"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter" || (e.key === "Enter" && e.ctrlKey)) {
                      searchUsers();
                    }
                  }}
                  value={search}
                />
              </div>
              {search.length >= 1 && (
                <LuX
                  onClick={() => setSearch("")}
                  className="absolute right-0 mr-3 text-slate-700 hover:cursor-pointer hover:text-slate-950"
                />
              )}
            </div>
            <Button
              className="bg-slate-800"
              disabled={!search}
              onClick={() => searchUsers()}
            >
              <LuSearch />
            </Button>
          </div>

          <DataTable columns={columns} data={users} loading={loadingUsers} />

          {!loadingUsers && paging.total_data > 5 && (
            <section className="mt-3 flex w-full justify-end">
              <Pagination>
                <PaginationContent className="flex-wrap">
                  {paging.current_page !== 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        className="hover:cursor-pointer"
                        onClick={() =>
                          handlePageChange(paging.current_page - 1)
                        }
                      />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationLink
                      className={`hover:cursor-pointer ${
                        1 === paging.current_page && "font-bold"
                      }`}
                      onClick={() => handlePageChange(1)}
                    >
                      <Button
                        variant={
                          1 === paging.current_page ? "default" : "ghost"
                        }
                      >
                        1
                      </Button>
                    </PaginationLink>
                  </PaginationItem>

                  {paging.current_page > 4 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {Array.from(
                    { length: paging.total_page },
                    (_, index) => index + 1,
                  ).map(
                    (pageNumber) =>
                      pageNumber !== 1 &&
                      pageNumber !== paging.total_page &&
                      pageNumber >= paging.current_page - 1 &&
                      pageNumber <= paging.current_page + 1 && (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            className={`hover:cursor-pointer ${
                              pageNumber === paging.current_page && "font-bold"
                            }`}
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            <Button
                              variant={
                                pageNumber === paging.current_page
                                  ? "default"
                                  : "ghost"
                              }
                            >
                              {pageNumber}
                            </Button>
                          </PaginationLink>
                        </PaginationItem>
                      ),
                  )}

                  {paging.current_page <= paging.total_page - 4 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationLink
                      className={`hover:cursor-pointer ${
                        paging.total_page === paging.current_page && "font-bold"
                      }`}
                      onClick={() => handlePageChange(paging.total_page)}
                    >
                      <Button
                        variant={
                          paging.total_page === paging.current_page
                            ? "default"
                            : "ghost"
                        }
                      >
                        {paging.total_page}
                      </Button>
                    </PaginationLink>
                  </PaginationItem>

                  {paging.current_page !== paging.total_page && (
                    <PaginationItem>
                      <PaginationNext
                        className="hover:cursor-pointer"
                        onClick={() =>
                          handlePageChange(paging.current_page + 1)
                        }
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </section>
          )}
        </section>
      </section>
    </AdminLayout>
  );
};
