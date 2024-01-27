import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components";
import { AdminLayout } from "@/layouts";
import { Label } from "@radix-ui/react-label";
import { FC, ReactElement, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./table/data-table";
import { columns } from "./table/column";
import { data } from "./table/store";

export const DashboardNewsCreate: FC = (): ReactElement => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const navigate = useNavigate();

  return (
    <AdminLayout>
      <section className="flex h-[510px] w-full justify-between pt-7">
        <section className="container flex h-full w-[48%] flex-col justify-evenly rounded-md border">
          <h1 className="mt-5 text-lg font-black text-[#0F172A]">Add News</h1>
          <p className="w-3/4 text-xs text-[#64748B]">
            Untuk menambah data news, isi form input dibawah dengan benar.
          </p>
          <section className="flex w-full flex-col gap-1">
            <h2 className="text-sm text-[#0F172A] hover:cursor-default">
              Image Cover
            </h2>
            <section className="flex h-10 w-full justify-between gap-3">
              <Label
                htmlFor="image"
                className="flex w-[75%] items-center truncate rounded-md border border-[#CBD5E1] pl-2 text-sm text-font-input hover:cursor-pointer hover:bg-slate-100"
              >
                {selectedFile ? selectedFile.name : "Choose image to upload"}
              </Label>
              <label
                htmlFor="image"
                className="relative grid w-32 cursor-pointer place-items-center rounded-md bg-[#0F172A] pt-2 text-sm text-white hover:bg-slate-700"
              >
                Browse file
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </section>
          </section>
          <section className="flex w-full flex-col gap-1">
            <Label htmlFor="news-title" className="text-sm text-[#0F172A]">
              News Title
            </Label>
            <Input
              type="text"
              id="news-title"
              placeholder="Input news title"
              className="h-10"
            />
          </section>
          <section className="flex w-full flex-col gap-1 text-font-input">
            <h3 className="text-sm text-[#0F172A]">Category</h3>
            <section className="flex h-10 select-none items-center rounded-md border text-sm text-[#0F172A]">
              <Select>
                <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select category news" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="tanaman-herbal">
                      Tanaman Herbal
                    </SelectItem>
                    <SelectItem value="teknologi-pengobatan">
                      Teknologi pengobatan
                    </SelectItem>
                    <SelectItem value="tips-kesehatan">
                      Tips Kesehatan
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>
          </section>
          <section className="flex w-full flex-col gap-1">
            <Label
              htmlFor="news-description"
              className="text-sm text-[#0F172A]"
            >
              Description
            </Label>
            <Textarea
              id="news-description"
              placeholder="Type your message here"
              className="h-14 resize-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0"
            />
          </section>
          <section className="flex w-full justify-end gap-2 py-2">
            <Button size={"sm"} onClick={() => navigate("/dashboard/news")}>
              Cancel
            </Button>
            <Button
              size={"sm"}
              className="gap-1 bg-bright-2 font-bold text-font-black-3 hover:bg-bright-1"
            >
              Add News <MdOutlineAddBox className="text-xl" />
            </Button>
          </section>
        </section>
        <section className="flex h-full w-[48%]">
          <DataTable columns={columns} data={data} />
        </section>
      </section>
    </AdminLayout>
  );
};
