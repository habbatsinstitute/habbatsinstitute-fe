import {
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
} from "@/components";
import { ColumnDef } from "@tanstack/react-table";
import { LuTrash } from "react-icons/lu";
import { Link } from "react-router-dom";

export type User = {
  id: string;
  role: string;
  username: string;
  expired: string;
  manageButton?: () => void;
  deleteButton?: () => void;
};

export const columns: ColumnDef<User>[] = [
  { header: "No", cell: (cell) => cell.row.index + 1 },
  {
    accessorKey: "id",
    header: "User ID",
  },
  {
    accessorKey: "role",
    header: "Role ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "expired",
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
                Anda akan menghapus data username{" "}
                <span className="font-bold">
                  "{cell.row.original.username}"
                </span>
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
