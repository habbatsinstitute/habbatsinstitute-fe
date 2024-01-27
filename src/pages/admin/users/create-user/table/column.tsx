import { ColumnDef } from "@tanstack/react-table";
import { LuPenLine } from "react-icons/lu";
import { Link } from "react-router-dom";

export type User = {
  id: string;
  username: string;
  manageButton?: () => void;
};

export const columns: ColumnDef<User>[] = [
  { header: "No", cell: (cell) => cell.row.index + 1 },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "option",
    header: "Opsi",
    cell: (cell) => (
      <section className="flex w-full justify-center py-2">
        <Link
          to={`/dashboard/users/manage/${cell.row.original.id}`}
          className="flex h-7 w-28 items-center justify-center gap-1 rounded-md bg-bright-2 text-font-black-3 hover:bg-bright-1"
          onClick={() => console.log(cell.row.original)}
        >
          <LuPenLine className="text-xl" />
          Manage
        </Link>
      </section>
    ),
  },
];
