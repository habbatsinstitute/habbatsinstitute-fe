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
  Button,
  Calendar,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import { AdminLayout } from "@/layouts";
import { Label } from "@radix-ui/react-label";
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./table/data-table";
import { columns } from "./table/column";
import { data } from "./table/store";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { LuTrash, LuSave } from "react-icons/lu";

export const DashboardUsersManage: FC = (): ReactElement => {
  const [date, setDate] = React.useState<Date>();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <section className="flex h-[510px] w-full justify-between pt-7">
        <section className="container flex h-full w-[48%] flex-col justify-evenly rounded-md border">
          <h1 className="mt-5 text-lg font-black text-[#0F172A]">Edit User</h1>
          <p className="w-3/4 text-xs text-[#64748B]">
            Untuk menambah data user, isi form input dibawah dengan benar.
          </p>
          <section className="flex w-full flex-col gap-1">
            <Label htmlFor="username" className="text-sm text-[#0F172A]">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              placeholder="Input username"
              className="h-10"
            />
          </section>
          <section className="flex w-full flex-col gap-1">
            <Label htmlFor="password" className="text-sm text-[#0F172A]">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Input password"
              className="h-10"
            />
            <p className="text-xs text-[#64748B]">
              Gunakan campuran huruf, angka, dan simbol.
            </p>
          </section>
          <section className="flex w-full flex-col gap-1">
            <Label
              htmlFor="confirm-password"
              className="text-sm text-[#0F172A]"
            >
              Confirmation Password
            </Label>
            <Input
              type="password"
              id="confirm-password"
              placeholder="Input username"
              className="h-10"
            />
          </section>
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
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </section>
          <section className="flex w-full justify-end gap-2 py-2">
            <Button size={"sm"} onClick={() => navigate("/dashboard/users")}>
              Cancel
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  className="flex gap-1"
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
            >
              Save <LuSave className="text-lg" />
            </Button>
          </section>
        </section>
        <section className="flex h-full w-[48%]">
          <DataTable columns={columns} data={data} />
        </section>
      </section>
    </AdminLayout>
  );
};
