import { FC, ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Slide, toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { LuPenLine } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
import {
  AdminLayout,
  Button,
  DataTable,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Label,
  Textarea,
} from "@/components";
import {
  TCourseItems,
  createCourseSchema,
  formatDate,
  useCreateCourse,
  useGetCourse,
  useGetUserMe,
} from "@/lib";

export const DashboardCourseCreate: FC = (): ReactElement => {
  const [course, setCourse] = useState<TCourseItems[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const navigate = useNavigate();

  const { data: userMe } = useGetUserMe();
  const { data: getCourse, refetch } = useGetCourse();
  const { mutate, isPending } = useCreateCourse();

  useEffect(() => {
    if (getCourse?.data) {
      setCourse(getCourse?.data);
    }
  }, [getCourse?.data, setCourse]);

  function onSubmit(values: z.infer<typeof createCourseSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("author", userMe?.data?.username || "");
    formData.append("description", values.description);
    formData.append("media_file", selectedFile as Blob);

    mutate(formData, {
      onSuccess: () => {
        refetch();
        toast.success("Data course berhasil ditambahkan", {
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
        toast.error("Gagal menambahkan data course", {
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

  const columns: ColumnDef<TCourseItems>[] = [
    { header: "No", cell: (cell) => cell.row.index + 1 },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "option",
      header: "Opsi",
      cell: () => (
        <section className="flex w-full justify-center py-2">
          <Link
            // to={`/dashboard/courses/manage/${cell.row.original.id}`}
            to={`/dashboard/courses/add`}
            className="flex h-7 w-28 items-center justify-center gap-1 rounded-md bg-bright-2 text-font-black-3 hover:bg-bright-1"
            onClick={() => {
              toast.warn("This feature is still development", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
              });
            }}
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
              Add Course
            </h1>
            <p className="w-3/4 text-xs text-[#64748B]">
              Untuk menambah data course, isi form input dibawah dengan benar.
            </p>
            <section className="flex w-full flex-col gap-1">
              <h2 className="text-sm text-[#0F172A] hover:cursor-default">
                Videos
              </h2>
              <section className="flex h-10 w-full justify-between gap-3">
                <Label
                  htmlFor="video"
                  className={`flex w-[75%] items-center truncate rounded-md border border-[#CBD5E1] pl-2 text-sm text-font-input hover:bg-slate-100 ${isPending ? "cursor-not-allowed opacity-40 hover:bg-slate-100" : "hover:cursor-pointer"}`}
                >
                  {selectedFile ? selectedFile.name : "Choose video to upload"}
                </Label>
                <label
                  htmlFor="video"
                  className={`relative grid w-32 place-items-center rounded-md bg-[#0F172A] pt-2 text-sm text-white hover:bg-slate-700 ${isPending ? "cursor-not-allowed opacity-10 hover:bg-[#0F172A]" : "cursor-pointer"}`}
                >
                  Browse file
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={isPending}
                  />
                </label>
              </section>
            </section>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel
                    className={`text-sm ${form.formState.errors?.title ? "text-red-400" : "text-[#0F172A]"}`}
                  >
                    Course Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Input course title"
                      className={
                        form.formState.errors?.title
                          ? "border-red-400 placeholder:text-red-400"
                          : ""
                      }
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <section className="w-full">
                    <p className="text-xs font-bold text-red-400">
                      {form.formState.errors.title?.message}
                    </p>
                  </section>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel
                    className={`text-sm ${form.formState.errors.description ? "text-red-400" : "text-[#0F172A]"}`}
                  >
                    Course Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here"
                      className={`h-14 resize-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0 ${form.formState.errors.description ? "border-red-400 placeholder:text-red-400" : ""}`}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <section className="w-full">
                    <p className="text-xs font-bold text-red-400">
                      {form.formState.errors.description?.message}
                    </p>
                  </section>
                </FormItem>
              )}
            />
            <section className="flex w-full flex-col gap-1 text-font-input">
              <h3 className="text-sm">Time Create</h3>
              <section className="flex h-10 select-none items-center rounded-md border pl-3 text-sm">
                {formatDate(new Date())}
              </section>
            </section>
            <section className="flex w-full justify-end gap-2 py-2">
              <Button
                size={"sm"}
                type="button"
                onClick={() => navigate("/dashboard/courses")}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                size={"sm"}
                type="submit"
                className="gap-1 bg-bright-2 font-bold text-font-black-3 hover:bg-bright-1"
                disabled={!form.formState.isValid || !selectedFile || isPending}
              >
                {isPending && <Loader2 className="w-4 animate-spin" />}
                Add Course <MdOutlineAddBox className="text-xl" />
              </Button>
            </section>
          </form>
        </Form>
        <section className="flex h-full w-[48%]">
          <DataTable columns={columns} data={course || []} />
        </section>
      </section>
    </AdminLayout>
  );
};
