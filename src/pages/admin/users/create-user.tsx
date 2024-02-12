import { FC, ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Slide, toast } from "react-toastify";
import { format } from "date-fns";
import { MdOutlineAddBox } from "react-icons/md";
import { CalendarIcon, Loader2 } from "lucide-react";
import { LuPenLine } from "react-icons/lu";
import {
  AdminLayout,
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
  TUser,
  cn,
  userSchema,
  useCreateUser,
  TGetAllUsersResponse,
  api,
} from "@/lib";

export const DashboardUsersCreate: FC = (): ReactElement => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      confirmation_password: "",
    },
  });

  const { mutate, isPending } = useCreateUser();

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

  function onSubmit(values: z.infer<typeof userSchema>) {
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("expiry_date", date?.toISOString() as string);

    mutate(formData, {
      onSuccess: () => {
        getUsers();
        toast.success("Data user berhasil ditambahkan", {
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
        toast.error("Gagal menambahkan data user", {
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
          <Link
            to={`/dashboard/users/manage/${cell.row.original.id}`}
            className="flex h-7 w-28 items-center justify-center gap-1 rounded-md bg-bright-2 text-font-black-3 hover:bg-bright-1"
          >
            <LuPenLine className="text-xl" />
            Manage
          </Link>
        </section>
      ),
    },
  ];

  return (
    <AdminLayout>
      <section className="flex min-h-[500px] w-full flex-col justify-between gap-10 pt-7 md:gap-0 xl:min-h-[510px] xl:flex-row">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container flex h-full w-full flex-col justify-evenly gap-3 rounded-md border py-5 lg:gap-0 xl:w-[48%] xl:py-0"
          >
            <h1 className="mt-5 text-lg font-black text-[#0F172A]">Add User</h1>
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
                      disabled={isPending}
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
                      disabled={isPending}
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
                      disabled={isPending}
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
                    disabled={isPending}
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
                disabled={isPending}
                size={"sm"}
                onClick={() => navigate("/dashboard/users")}
              >
                Cancel
              </Button>
              <Button
                size={"sm"}
                disabled={!form.formState.isValid || !date || isPending}
                className="gap-1 bg-bright-2 font-bold text-font-black-3 hover:bg-bright-1"
              >
                {isPending && <Loader2 className="w-4 animate-spin" />} Add User{" "}
                <MdOutlineAddBox className="text-xl" />
              </Button>
            </section>
          </form>
        </Form>
        <section className="flex h-full w-full py-10 md:mt-10 lg:py-0 xl:mt-0 xl:w-[48%]">
          <DataTable columns={columns} data={users} loading={loading} />
        </section>
      </section>
    </AdminLayout>
  );
};
