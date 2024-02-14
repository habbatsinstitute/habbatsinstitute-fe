import { FC, ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Slide, toast } from "react-toastify";
import { MdOutlineAddBox } from "react-icons/md";
import { LuRefreshCcw, LuTrash } from "react-icons/lu";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components";
import {
  TCourseItems,
  TGetCourseResponse,
  TPaging,
  api,
  formatDateResponse,
  useRemoveCourse,
} from "@/lib";

export const DashboardCourseGet: FC = (): ReactElement => {
  const [courses, setCourses] = useState<TCourseItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paging, setPaging] = useState<TPaging>({
    previous_page: 0,
    current_page: 1,
    next_page: 0,
    page_size: 5,
    total_page: 0,
    total_data: 0,
  });

  const navigate = useNavigate();

  const { mutate } = useRemoveCourse();

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

  const columns: ColumnDef<TCourseItems>[] = [
    {
      header: "No",
      cell: (cell) =>
        (paging.current_page - 1) * paging.page_size + cell.row.index + 1,
    },
    {
      accessorKey: "media_file",
      header: "Videos",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "created_at",
      header: "Upload Time",
    },
    {
      accessorKey: "option",
      header: "Opsi",
      cell: (cell) => (
        <section className="flex w-24 items-center justify-between gap-2 py-1">
          <Link
            to={`/dashboard/courses/manage/${cell.row.original.id}`}
            className="grid h-8 w-20 place-items-center rounded-md bg-dark-2 px-2 text-font-white hover:bg-slate-700"
          >
            Manage
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="h-8 w-14" variant={"destructive"}>
                <LuTrash className="text-white" />
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
                    Anda akan menghapus data course dengan judul{" "}
                    <span className="font-bold">
                      "{cell.row.original.title}"
                    </span>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() =>
                    mutate(cell.row.original.id, {
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
        </section>
      ),
    },
  ];

  const formattedCourseData = courses.map((course) => ({
    ...course,
    created_at: formatDateResponse(course.created_at),
  }));

  return (
    <AdminLayout>
      <section className="flex min-h-[450px] w-full flex-col py-10 md:py-0 md:pt-2">
        <section className="flex w-full gap-3">
          <Button
            onClick={() => navigate("/dashboard/courses/add")}
            className="flex w-36 items-center justify-center gap-1 bg-bright-1 text-font-black-1 hover:bg-bright-2"
          >
            <MdOutlineAddBox className="text-xl" />
            Add Course
          </Button>
          <Button
            onClick={() => {
              getCourses();
            }}
            className="flex items-center justify-center gap-1 bg-emerald-300 text-black hover:bg-emerald-400"
          >
            <LuRefreshCcw className={`${loading && "animate-spin"} text-xl`} />
          </Button>
        </section>

        <section className="mt-3 flex min-h-[450px] w-full flex-col">
          <DataTable
            columns={columns}
            data={formattedCourseData}
            loading={loading}
          />

          {!loading && paging.total_data > 5 && (
            <section className="mt-3 flex w-full justify-end">
              <Pagination>
                <PaginationContent className="w-full flex-wrap justify-end">
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
