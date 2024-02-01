import { FC, ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ColumnDef } from "@tanstack/react-table";
import { Slide, toast } from "react-toastify";
import { MdOutlineAddBox } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
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
  Button,
  DataTable,
} from "@/components";
import { TCourseItems, formatDateResponse, useGetCourse } from "@/lib";

export const DashboardCourseGet: FC = (): ReactElement => {
  const [course, setCourse] = useState<TCourseItems[]>([]);

  const navigate = useNavigate();

  const { data } = useGetCourse();

  useEffect(() => {
    if (data?.data) {
      setCourse(data.data);
    }
  }, [data?.data, setCourse]);

  const columns: ColumnDef<TCourseItems>[] = [
    { header: "No", cell: (cell) => cell.row.index + 1 },
    {
      accessorKey: "title",
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
            // to={`/dashboard/courses/manage/${cell.row.original.id}`}
            to={`/dashboard/courses`}
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
            className="grid h-8 w-20 place-items-center rounded-md bg-dark-2 px-2 text-font-white hover:bg-slate-700"
          >
            Manage
          </Link>
          <AlertDialog>
            {/* <AlertDialogTrigger asChild> */}
            <Button
              className="h-8 w-14"
              variant={"destructive"}
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
              <LuTrash className="text-white" />
            </Button>
            {/* </AlertDialogTrigger> */}
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
                <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                  Delete data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      ),
    },
  ];

  const formattedCourseData = course.map((course) => ({
    ...course,
    created_at: formatDateResponse(course.created_at),
  }));

  return (
    <AdminLayout>
      <section className="flex h-[400px] w-full flex-col pt-7">
        <Button
          onClick={() => navigate("/dashboard/courses/add")}
          className="flex w-36 items-center justify-center gap-1 bg-bright-1 text-font-black-1 hover:bg-bright-2"
        >
          <MdOutlineAddBox className="text-xl" />
          Add Course
        </Button>
        <section className="mt-3 h-[400px] w-full">
          <DataTable columns={columns} data={formattedCourseData || []} />
        </section>
      </section>
    </AdminLayout>
  );
};
