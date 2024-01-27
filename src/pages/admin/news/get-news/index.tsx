import { Button } from "@/components";
import { AdminLayout } from "@/layouts";
import { FC, ReactElement } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { DataTable } from "./table/data-table";
import { columns } from "./table/column";
import { data } from "./table/store";
import { useNavigate } from "react-router-dom";

export const DashboardNewsGet: FC = (): ReactElement => {
  const navigate = useNavigate();

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
          <DataTable columns={columns} data={data} />
        </section>
      </section>
    </AdminLayout>
  );
};