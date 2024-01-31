import { FC, ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { ColumnDef } from "@tanstack/react-table";
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

export const DashboardCourseGet: FC = (): ReactElement => {
  const navigate = useNavigate();

  type Course = {
    id: string;
    videos: string;
    title: string;
    author: string;
    uploadTime: string;
    manageButton?: () => void;
    deleteButton?: () => void;
  };

  const columns: ColumnDef<Course>[] = [
    { header: "No", cell: (cell) => cell.row.index + 1 },
    {
      accessorKey: "videos",
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
      accessorKey: "uploadTime",
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
              <Button
                className="h-8 w-14"
                variant={"destructive"}
                onClick={() => console.log(cell.row.original)}
              >
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
                <AlertDialogAction className="bg-[#DC5E5E] hover:bg-red-400">
                  Delete data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      ),
    },
  ];

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
          <DataTable columns={columns} data={[]} />
        </section>
      </section>
    </AdminLayout>
  );
};
