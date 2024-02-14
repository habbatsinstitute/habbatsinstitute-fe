import { FC, ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Slide, toast } from "react-toastify";
import { LuRefreshCcw, LuTrash } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
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
  TGetAllUsersResponse,
  TPaging,
  TUser,
  api,
  formatDateResponse,
  useRemoveUser,
} from "@/lib";

export const DashboardUsersGet: FC = (): ReactElement => {
  const [users, setUsers] = useState<TUser[]>([]);
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

  const { mutate } = useRemoveUser();

  const getUsers = async (
    page: number = paging.current_page || 1,
    pageSize: number = 5,
  ) => {
    try {
      setLoading(true);
      const { data } = await api.get<TGetAllUsersResponse>("/users", {
        params: {
          page,
          page_size: pageSize,
        },
      });
      setUsers(data?.data);
      setPaging(data?.pagination);
    } catch (error) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handlePageChange = (page: number) => {
    getUsers(page);
  };

  const formattedUsersData = users.map((users) => ({
    ...users,
    expiry_date: formatDateResponse(users.expiry_date),
  }));

  const columns: ColumnDef<TUser>[] = [
    {
      header: "No",
      cell: (cell) =>
        (paging.current_page - 1) * paging.page_size + cell.row.index + 1,
    },
    {
      accessorKey: "id",
      header: "User ID",
    },
    {
      accessorKey: "role_id",
      header: "Role ID",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "expiry_date",
      header: "Expiry ID",
    },
    {
      accessorKey: "option",
      header: "Opsi",
      cell: (cell) => (
        <section className="flex w-24 items-center justify-between gap-2 py-1">
          <Link
            to={`/dashboard/users/manage/${cell.row.original.id}`}
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
                    Anda akan menghapus data username{" "}
                    <span className="font-bold">
                      "{cell.row.original.username}"
                    </span>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => {
                    mutate(cell.row.original.id, {
                      onSuccess: () => {
                        getUsers();
                        toast.success("Data user berhasil dihapus", {
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
                        toast.error("Gagal menghapus user", {
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
                  }}
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

  return (
    <AdminLayout>
      <section className="flex min-h-[400px] w-full flex-col py-10 md:py-0 md:pt-2">
        <section className="flex w-full gap-3">
          <Button
            onClick={() => navigate("/dashboard/users/add")}
            className="flex w-36 items-center justify-center gap-1 bg-bright-1 text-font-black-1 hover:bg-bright-2"
          >
            <MdOutlineAddBox className="text-xl" />
            Add User
          </Button>
          <Button
            onClick={() => {
              getUsers();
            }}
            className="flex items-center justify-center gap-1 bg-emerald-300 text-black hover:bg-emerald-400"
          >
            <LuRefreshCcw className={`${loading && "animate-spin"} text-xl`} />
          </Button>
        </section>

        <section className="mt-3 min-h-[400px] w-full">
          <DataTable
            columns={columns}
            data={formattedUsersData}
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
