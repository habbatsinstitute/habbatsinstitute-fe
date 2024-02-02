import { FC, ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { LuTrash, LuSave, LuPenLine } from "react-icons/lu";
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
import { TUser, cn, useGetAllUsers, useGetUserById, userSchema } from "@/lib";

export const DashboardUsersManage: FC = (): ReactElement => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [date, setDate] = useState<Date>();

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: getUserById,
    refetch: refetchUserById,
    isFetching: isFetchUserById,
  } = useGetUserById(id);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      confirmation_password: "",
    },
  });

  const { data: getUsers } = useGetAllUsers();

  useEffect(() => {
    if (getUsers?.data) {
      setUsers(getUsers?.data);
    }
  }, [getUsers?.data, setUsers]);

  useEffect(() => {
    refetchUserById();
    form.reset(getUserById?.data);
  }, [form, form.reset, getUserById?.data, id, refetchUserById]);

  function onSubmit(values: z.infer<typeof userSchema>) {
    console.log(values);
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
      <section className="flex h-[510px] w-full justify-between pt-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container flex h-full w-[48%] flex-col justify-evenly rounded-md border"
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
                disabled={isFetchUserById}
                onClick={() => navigate("/dashboard/users")}
              >
                Cancel
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size={"sm"}
                    variant={"destructive"}
                    className="flex gap-1"
                    disabled={isFetchUserById}
                  >
                    Delete
                    <LuTrash />
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
                      <span className="font-bold">"{"Username"}"</span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-[#DC5E5E] hover:bg-red-400">
                      Delete data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                size={"sm"}
                className="gap-1 bg-bright-2 font-bold text-font-black-3 hover:bg-bright-1"
                disabled={isFetchUserById}
              >
                Save <LuSave className="text-lg" />
              </Button>
            </section>
          </form>
        </Form>

        <section className="flex h-full w-[48%]">
          <DataTable columns={columns} data={users || []} />
        </section>
      </section>
    </AdminLayout>
  );
};
