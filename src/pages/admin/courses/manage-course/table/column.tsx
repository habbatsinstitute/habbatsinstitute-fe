import { ColumnDef } from "@tanstack/react-table";
import { LuPenLine } from "react-icons/lu";
import { Link } from "react-router-dom";

export type Payment = {
  id: string;
  title: string;
  manageButton?: () => void;
};

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "id", header: "No" },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "option",
    header: "Opsi",
    cell: (cell) => (
      <section className="flex w-full justify-center py-2">
        <Link
          to={`/dashboard/courses/manage/${cell.row.original.id}`}
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
