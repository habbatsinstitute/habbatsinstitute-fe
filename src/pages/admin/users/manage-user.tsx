import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Slide, toast } from "react-toastify";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { LuTrash, LuSave, LuPenLine, LuLoader2 } from "react-icons/lu";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import {
  TGetAllUsersResponse,
  TUser,
  api,
  cn,
  useGetUserById,
  useRemoveUser,
  useUpdateUser,
  userSchema,
} from "@/lib";

export const DashboardUsersManage: FC = (): ReactElement => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();

  const { id } = useParams();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      confirmation_password: "",
    },
  });

  const {
    data: getUserById,
    refetch: refetchUserById,
    isFetching: isFetchUserById,
  } = useGetUserById(id);
  const { mutate: update, isPending: isPendingUpdate } = useUpdateUser(id);
  const { mutate: remove, isPending: isPendingRemove } = useRemoveUser();

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<TGetAllUsersResponse>("/users");
      setUsers(data?.data.filter((user) => user.role_id === 1));
    } catch (error) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    refetchUserById();
    form.reset(getUserById?.data);
  }, [form, form.reset, getUserById?.data, id, refetchUserById]);

  function onSubmit(values: z.infer<typeof userSchema>) {
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("expiry_date", date?.toISOString() as string);

    update(formData, {
      onSuccess: () => {
        getUsers();
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
    { header: "No", cell: (cell) => cell.row.index + 1 },
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
            disabled={isFetchUserById || isPendingUpdate || isPendingRemove}
          >
            {isFetchUserById || isPendingUpdate || isPendingRemove ? (
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
      <section className="flex h-[1000px] w-full flex-col justify-between gap-10 pt-7 md:gap-0 xl:h-[510px] xl:flex-row">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container flex h-full w-full flex-col justify-evenly gap-3 rounded-md border py-5 lg:gap-0 xl:w-[48%] xl:py-0"
          >
            <h1 className="mt-5 text-lg font-black text-[#0F172A]">
              Edit User
            </h1>
            <p className="w-3/4 text-xs text-[#64748B]">
              Untuk menambah data user, isi form input dibawah dengan benar.
            </p>
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
                      disabled={isFetchUserById}
                      {...field}
                    />
                  </FormControl>
                  <section className="w-full">
                    <p className="text-xs font-bold text-red-400">
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
                      disabled={isFetchUserById}
                      {...field}
                    />
                  </FormControl>
                  <section className="w-full">
                    <p className="text-xs font-bold text-red-400">
                      {form.formState.errors.password?.message}
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
                        form.formState.errors.confirmation_password
                          ? "border-red-400 placeholder:text-red-400"
                          : ""
                      }
                      disabled={isFetchUserById}
                      {...field}
                    />
                  </FormControl>
                  <section className="w-full">
                    <p className="text-xs font-bold text-red-400">
                      {form.formState.errors.confirmation_password?.message}
                    </p>
                  </section>
                </FormItem>
              )}
            />
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
                    disabled={isFetchUserById}
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
                disabled={isPendingUpdate || isPendingRemove || isFetchUserById}
                onClick={() => navigate("/dashboard/users")}
              >
                {isFetchUserById || isPendingUpdate || isPendingRemove ? (
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
                    disabled={
                      isPendingUpdate || isPendingRemove || isFetchUserById
                    }
                  >
                    {isFetchUserById || isPendingUpdate || isPendingRemove ? (
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
                      Anda akan menghapus data user dengan username{" "}
                      <span className="font-bold">
                        "{getUserById?.data.username}"
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#DC5E5E] hover:bg-red-400"
                      onClick={() =>
                        remove(id, {
                          onSuccess: () => {
                            getUsers();
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
                className="gap-1 bg-bright-2 font-bold text-font-black-3 hover:bg-bright-1"
                disabled={
                  !form.formState.isValid ||
                  isFetchUserById ||
                  isPendingUpdate ||
                  isPendingRemove
                }
              >
                {(isPendingRemove || isFetchUserById || isPendingUpdate) && (
                  <LuLoader2 className="mx-7 w-full animate-spin" />
                )}
                {!isPendingRemove && !isFetchUserById && !isPendingUpdate && (
                  <Fragment>
                    Save <LuSave className="text-lg" />
                  </Fragment>
                )}
              </Button>
            </section>
          </form>
        </Form>

        <section className="flex h-full w-full md:mt-10 xl:mt-0 xl:w-[48%]">
          <DataTable columns={columns} data={users} loading={loading} />
        </section>
      </section>
    </AdminLayout>
  );
};
