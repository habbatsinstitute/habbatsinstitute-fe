import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Textarea,
} from "@/components";
import {
  TCourseItems,
  TGetCourseResponse,
  TPaging,
  api,
  courseSchema,
  formatDate,
  useCreateCourse,
  useGetUserMe,
} from "@/lib";

export const DashboardCourseCreate: FC = (): ReactElement => {
  const [courses, setCourses] = useState<TCourseItems[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [paging, setPaging] = useState<TPaging>({
    previous_page: 0,
    current_page: 1,
    next_page: 0,
    page_size: 5,
    total_page: 0,
    total_data: 0,
  });

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

  const navigate = useNavigate();

  const { data: userMe } = useGetUserMe();
  const { mutate, isPending } = useCreateCourse();

  const getCourses = async (
    page: number = paging.current_page || 1,
    pageSize: number = 5,
  ) => {
    try {
      setLoading(true);
      const { data } = await api.get<TGetCourseResponse>("/courses", {
        params: {
          page,
          page_size: pageSize,
        },
      });
      setCourses(data?.data);
      setPaging(data?.pagination);
    } catch (error) {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handlePageChange = (page: number) => {
    getCourses(page);
  };

  function onSubmit(values: z.infer<typeof courseSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("author", userMe?.data?.username || "");
    formData.append("description", values.description);
    formData.append("media_file", selectedFile as Blob);

    mutate(formData, {
      onSuccess: () => {
        getCourses();
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
    {
      header: "No",
      cell: (cell) =>
        (paging.current_page - 1) * paging.page_size + cell.row.index + 1,
    },
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
            disabled={isPending}
            onClick={() => {
              navigate(`/dashboard/courses/manage/${cell.row.original.id}`);
            }}
          >
            {isPending ? (
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
              Add Course
            </h1>
            <p className="w-3/4 text-xs text-[#64748B]">
              Untuk menambah data course, isi form input dibawah dengan benar.
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
                  className={`flex w-[75%] items-center truncate rounded-md border ${(selectedFile && selectedFile?.type !== "video/mp4") || (selectedFile && selectedFile?.size > 100000000) ? "border-red-400 text-red-400" : "border-[#CBD5E1] text-font-input"} pl-2 text-sm  hover:bg-slate-100 ${isPending ? "cursor-not-allowed opacity-40 hover:bg-slate-100" : "hover:cursor-pointer"}`}
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
                    accept="video/mp4"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={isPending}
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
                disabled={
                  !form.formState.isValid ||
                  !selectedFile ||
                  isPending ||
                  selectedFile.type !== "video/mp4" ||
                  selectedFile?.size > 100000000
                }
              >
                {isPending && <Loader2 className="w-4 animate-spin" />}
                Add Course <MdOutlineAddBox className="text-xl" />
              </Button>
            </section>
          </form>
        </Form>
        <section className="flex h-full w-full flex-col md:mt-10 xl:mt-0 xl:w-[48%]">
          <DataTable columns={columns} data={courses} loading={loading} />

          {!loading && paging.total_data > 5 && (
            <section className="mt-3 flex w-full justify-end">
              <section>
                <Pagination>
                  <PaginationContent>
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
                                pageNumber === paging.current_page &&
                                "font-bold"
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
                          paging.total_page === paging.current_page &&
                          "font-bold"
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
            </section>
          )}
        </section>
      </section>
    </AdminLayout>
  );
};
