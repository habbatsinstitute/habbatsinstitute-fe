import { FC, ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { LuPenLine } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
import {
  AdminLayout,
  Button,
  DataTable,
  Input,
  Label,
  Textarea,
} from "@/components";
import { formatDate } from "@/lib";

export const DashboardCourseCreate: FC = (): ReactElement => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const navigate = useNavigate();

  type Course = {
    id: string;
    title: string;
    manageButton?: () => void;
  };

  const columns: ColumnDef<Course>[] = [
    { header: "No", cell: (cell) => cell.row.index + 1 },
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

  return (
    <AdminLayout>
      <section className="flex h-[510px] w-full justify-between pt-7">
        <section className="container flex h-full w-[48%] flex-col justify-evenly rounded-md border">
          <h1 className="mt-5 text-lg font-black text-[#0F172A]">Add Course</h1>
          <p className="w-3/4 text-xs text-[#64748B]">
            Untuk menambah data course, isi form input dibawah dengan benar.
          </p>
          <section className="flex w-full flex-col gap-1">
            <h2 className="text-sm text-[#0F172A] hover:cursor-default">
              Videos
            </h2>
            <section className="flex h-10 w-full justify-between gap-3">
              <Label
                htmlFor="video"
                className="flex w-[75%] items-center truncate rounded-md border border-[#CBD5E1] pl-2 text-sm text-font-input hover:cursor-pointer hover:bg-slate-100"
              >
                {selectedFile ? selectedFile.name : "Choose video to upload"}
              </Label>
              <label
                htmlFor="video"
                className="relative grid w-32 cursor-pointer place-items-center rounded-md bg-[#0F172A] pt-2 text-sm text-white hover:bg-slate-700"
              >
                Browse file
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </section>
          </section>
          <section className="flex w-full flex-col gap-1">
            <Label htmlFor="course-title" className="text-sm text-[#0F172A]">
              Course Title
            </Label>
            <Input
              type="text"
              id="course-title"
              placeholder="Input course title"
              className="h-10"
            />
          </section>
          <section className="flex w-full flex-col gap-1">
            <Label
              htmlFor="course-description"
              className="text-sm text-[#0F172A]"
            >
              Course Description
            </Label>
            <Textarea
              id="course-description"
              placeholder="Type your message here"
              className="h-14 resize-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0"
            />
          </section>
          <section className="flex w-full flex-col gap-1 text-font-input">
            <h3 className="text-sm">Time Create</h3>
            <section className="flex h-10 select-none items-center rounded-md border pl-3 text-sm">
              {formatDate(new Date())}
            </section>
          </section>
          <section className="flex w-full justify-end gap-2 py-2">
            <Button size={"sm"} onClick={() => navigate("/dashboard/courses")}>
              Cancel
            </Button>
            <Button
              size={"sm"}
              className="gap-1 bg-bright-2 font-bold text-font-black-3 hover:bg-bright-1"
            >
              Add Course <MdOutlineAddBox className="text-xl" />
            </Button>
          </section>
        </section>
        <section className="flex h-full w-[48%]">
          <DataTable columns={columns} data={[]} />
        </section>
      </section>
    </AdminLayout>
  );
};