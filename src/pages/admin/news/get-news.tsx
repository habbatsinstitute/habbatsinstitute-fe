import { FC, ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useRecoilValue } from "recoil";
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
  AlertDialogTrigger,
  Button,
  DataTable,
} from "@/components";
import { NewsData, newsState } from "@/lib";

export const DashboardNewsGet: FC = (): ReactElement => {
  const news: NewsData = useRecoilValue(newsState);
  const navigate = useNavigate();

  type News = {
    id: string | number;
    title: string;
    category: string;
    created_at: string;
    manageButton?: () => void;
    deleteButton?: () => void;
  };

  const columns: ColumnDef<News>[] = [
    { header: "No", cell: (cell) => cell.row.index + 1 },
    {
      accessorKey: "title",
      header: "News Title",
    },
    {
      accessorKey: "category",
      header: "Category",
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
            to={`/dashboard/news/manage/${cell.row.original.id}`}
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
                  Anda akan menghapus data news dengan judul{" "}
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
          onClick={() => navigate("/dashboard/news/add")}
          className="flex w-36 items-center justify-center gap-1 bg-bright-1 text-font-black-1 hover:bg-bright-2"
        >
          <MdOutlineAddBox className="text-xl" />
          Add News
        </Button>
        <section className="mt-3 h-[400px] w-full">
          <DataTable columns={columns} data={news.data} />
        </section>
      </section>
    </AdminLayout>
  );
};
