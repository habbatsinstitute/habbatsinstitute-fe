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
} from "@/components";
import {
  TCourseItems,
  TGetCourseResponse,
  api,
  formatDateResponse,
  useRemoveCourse,
} from "@/lib";

export const DashboardCourseGet: FC = (): ReactElement => {
  const [courses, setCourses] = useState<TCourseItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [paging, setPaging] = useState<TPaging>({
  //   total_data: 0,
  //   current_page: 0,
  //   next_page: 0,
  //   previous_page: 0,
  //   page_size: 0,
  //   total_page: 0,
  // });

  const navigate = useNavigate();

  const { mutate } = useRemoveCourse();

  const getCourses = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<TGetCourseResponse>("/courses");
      setCourses(data?.data);
      // setPaging(data?.pagination);
    } catch (error) {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const columns: ColumnDef<TCourseItems>[] = [
    { header: "No", cell: (cell) => cell.row.index + 1 },
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
                  Anda akan menghapus data course dengan judul{" "}
                  <span className="font-bold">"{cell.row.original.title}"</span>
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
      <section className="flex min-h-[450px] w-full flex-col pt-7">
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

        <section className="mt-3 flex h-[450px] w-full flex-col">
          <DataTable
            columns={columns}
            data={formattedCourseData}
            loading={loading}
          />

          {/* {!loading && (
            <section className="mt-3 flex w-full justify-end">
              <section>
                <Pagination>
                  <PaginationContent>
                    {paging.current_page !== 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href={`?page=${paging.current_page - 1}`}
                        />
                      </PaginationItem>
                    )}
                    {paging.previous_page !== 0 && (
                      <PaginationItem>
                        <PaginationLink href={`?page=${paging.previous_page}`}>
                          {paging.previous_page}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        href={`?page=${paging.current_page}`}
                        isActive
                      >
                        {paging.current_page}
                      </PaginationLink>
                    </PaginationItem>
                    {paging.next_page !== 0 && (
                      <PaginationItem>
                        <PaginationLink href={`?page=${paging.next_page}`}>
                          {paging.next_page}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </section>
            </section>
          )} */}
        </section>
      </section>
    </AdminLayout>
  );
};
