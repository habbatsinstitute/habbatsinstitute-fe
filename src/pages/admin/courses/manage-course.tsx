import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Slide, toast } from "react-toastify";
import { LuLoader2, LuPenLine, LuSave, LuTrash } from "react-icons/lu";
import { Loader2 } from "lucide-react";
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
  TGetCourseResponse,
  api,
  courseSchema,
  formatDate,
  useGetCourseById,
  useRemoveCourse,
  useUpdateCourse,
} from "@/lib";

export const DashboardCourseManage: FC = (): ReactElement => {
  const [courses, setCourses] = useState<TCourseItems[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const id = useParams();

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
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

  const {
    data: courseById,
    refetch: refetchCourseById,
    isFetching: isFetchingCourseById,
  } = useGetCourseById(id?.id);
  const { mutate: update, isPending: isPendingUpdate } = useUpdateCourse(
    id?.id,
  );
  const { mutate: remove, isPending: isPendingRemove } = useRemoveCourse();

  const navigate = useNavigate();

  const getCourses = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<TGetCourseResponse>("/courses");
      setCourses(data?.data);
    } catch (error) {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    refetchCourseById();
    form.reset(courseById?.data);
  }, [form, form.reset, courseById?.data, id, refetchCourseById]);

  function onSubmit(values: z.infer<typeof courseSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    if (selectedFile) {
      formData.append("media_file", selectedFile as Blob);
    }

    update(formData, {
      onSuccess: () => {
        getCourses();
        toast.success("Data course berhasil diupdate", {
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
        navigate("/dashboard/courses");
      },
      onError: () => {
        toast.error("Gagal update data course", {
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
      cell: (cell) => (
        <section className="flex w-full justify-center py-2">
          <Button
            className="flex h-7 w-28 items-center justify-center gap-1 rounded-md bg-bright-2 text-font-black-3 hover:bg-bright-1"
            onClick={() => {
              navigate(`/dashboard/courses/manage/${cell.row.original.id}`);
            }}
            disabled={
              isFetchingCourseById || isPendingUpdate || isPendingRemove
            }
          >
            {isFetchingCourseById || isPendingUpdate || isPendingRemove ? (
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
              Edit Course
            </h1>
            <p className="w-3/4 text-xs text-[#64748B]">
              Isi form input dibawah dengan benar.
            </p>

            <section className="flex w-full flex-col gap-1">
              <h2
                className={`text-sm ${(selectedFile && selectedFile?.type !== "video/mp4") || (selectedFile && selectedFile?.size > 100000000) ? "text-red-400" : "text-[#0F172A]"} hover:cursor-default`}
              >
                Videos
              </h2>
              <section className="flex h-10 w-full justify-between gap-3">
                <Label
                  htmlFor="video"
                  className={`flex w-[75%] items-center truncate rounded-md border ${(selectedFile && selectedFile?.type !== "video/mp4") || (selectedFile && selectedFile?.size > 100000000) ? "border-red-400 text-red-400" : "border-[#CBD5E1] text-font-input"} pl-2 text-sm  hover:bg-slate-100 ${isPendingUpdate || isPendingRemove ? "cursor-not-allowed opacity-40 hover:bg-slate-100" : "hover:cursor-pointer"}`}
                >
                  {selectedFile ? selectedFile.name : "Choose video to upload"}
                </Label>
                <label
                  htmlFor="video"
                  className={`relative grid w-32 place-items-center rounded-md bg-[#0F172A] pt-2 text-sm text-white hover:bg-slate-700 ${isPendingUpdate || isPendingRemove || isFetchingCourseById ? "cursor-not-allowed opacity-30 hover:bg-[#0F172A]" : "cursor-pointer"}`}
                >
                  {isFetchingCourseById ||
                  isPendingUpdate ||
                  isPendingRemove ? (
                    <LuLoader2 className="animate-spin" />
                  ) : (
                    "Browse file"
                  )}
                  <Input
                    id="video"
                    type="file"
                    accept="video/mp4"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={
                      isPendingUpdate || isPendingRemove || isFetchingCourseById
                    }
                  />
                </label>
              </section>
              {selectedFile && selectedFile?.type !== "video/mp4" && (
                <section className="w-full">
                  <p className="text-xs font-bold text-red-400">
                    Hanya mengizinkan format file mp4
                  </p>
                </section>
              )}
              {selectedFile && selectedFile?.size > 100000000 && (
                <section className="w-full">
                  <p className="text-xs font-bold text-red-400">
                    File tidak boleh lebih dari 100 MB
                  </p>
                </section>
              )}
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
                      disabled={
                        isPendingUpdate ||
                        isPendingRemove ||
                        isFetchingCourseById
                      }
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
                      disabled={
                        isPendingUpdate ||
                        isPendingRemove ||
                        isFetchingCourseById
                      }
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
                disabled={
                  isPendingUpdate || isPendingRemove || isFetchingCourseById
                }
              >
                {isFetchingCourseById || isPendingUpdate || isPendingRemove ? (
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
                      isPendingUpdate || isPendingRemove || isFetchingCourseById
                    }
                  >
                    {isFetchingCourseById ||
                    isPendingUpdate ||
                    isPendingRemove ? (
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
                      Anda akan menghapus data course dengan judul{" "}
                      <span className="font-bold">
                        "{courseById?.data.title}"
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#DC5E5E] hover:bg-red-400"
                      onClick={() =>
                        remove(id?.id, {
                          onSuccess: () => {
                            getCourses();
                            toast.success("Data course berhasil dihapus", {
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
                            navigate("/dashboard/courses");
                          },
                          onError: () => {
                            toast.error("Gagal menghapus data course", {
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
                  !form.formState.isValid ||
                  isPendingUpdate ||
                  isPendingRemove ||
                  isFetchingCourseById ||
                  (selectedFile !== null &&
                    selectedFile?.type !== "video/mp4") ||
                  (selectedFile !== null && selectedFile?.size > 100000000)
                }
              >
                {(isPendingRemove ||
                  isFetchingCourseById ||
                  isPendingUpdate) && (
                  <LuLoader2 className="mx-7 w-full animate-spin" />
                )}
                {!isPendingRemove &&
                  !isFetchingCourseById &&
                  !isPendingUpdate && (
                    <Fragment>
                      Save <LuSave className="text-lg" />
                    </Fragment>
                  )}
              </Button>
            </section>
          </form>
        </Form>
        <section className="flex h-full w-full md:mt-10 xl:mt-0 xl:w-[48%]">
          <DataTable columns={columns} data={courses} loading={loading} />
        </section>
      </section>
    </AdminLayout>
  );
};
