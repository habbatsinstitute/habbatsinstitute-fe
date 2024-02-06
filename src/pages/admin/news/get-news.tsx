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
  TGetNewsResponse,
  TNewsItems,
  api,
  formatDateResponse,
  useRemoveNews,
} from "@/lib";

export const DashboardNewsGet: FC = (): ReactElement => {
  const [news, setNews] = useState<TNewsItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { mutate } = useRemoveNews();

  const getNews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<TGetNewsResponse>("/news");
      setNews(data?.data);
    } catch (error) {
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const columns: ColumnDef<TNewsItems>[] = [
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
                  Anda akan menghapus data news dengan judul{" "}
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
                        getNews();
                        toast.success("Data news berhasil dihapus", {
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
                        toast.error("Gagal menghapus data", {
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
                  Delete Data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      ),
    },
  ];

  const formattedNewsData = news.map((news) => ({
    ...news,
    created_at: formatDateResponse(news.created_at),
  }));

  return (
    <AdminLayout>
      <section className="flex h-[400px] w-full flex-col pt-7">
        <section className="flex w-full gap-3">
          <Button
            onClick={() => navigate("/dashboard/news/add")}
            className="flex w-36 items-center justify-center gap-1 bg-bright-1 text-font-black-1 hover:bg-bright-2"
          >
            <MdOutlineAddBox className="text-xl" />
            Add News
          </Button>
          <Button
            onClick={() => {
              getNews();
            }}
            className="flex items-center justify-center gap-1 bg-emerald-300 text-black hover:bg-emerald-400"
          >
            <LuRefreshCcw className={`${loading && "animate-spin"} text-xl`} />
          </Button>
        </section>

        <section className="mt-3 h-[400px] w-full">
          <DataTable
            columns={columns}
            data={formattedNewsData}
            loading={loading}
          />
        </section>
      </section>
    </AdminLayout>
  );
};
