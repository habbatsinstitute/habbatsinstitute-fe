import { FC, ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Slide, toast } from "react-toastify";
import { MdOutlineAddBox } from "react-icons/md";
import { Loader2 } from "lucide-react";
import { LuPenLine } from "react-icons/lu";
import {
  AdminLayout,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Label,
  DataTable,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components";
import { createNewsSchema, newsState, useCreateNews, useGetNews } from "@/lib";

export const DashboardNewsCreate: FC = (): ReactElement => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const news = useRecoilValue(newsState);

  const form = useForm<z.infer<typeof createNewsSchema>>({
    resolver: zodResolver(createNewsSchema),
    mode: "all",
    defaultValues: {
      title: "",
      category: "",
      description: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const navigate = useNavigate();

  const { refetch } = useGetNews();
  const { mutate, isPending } = useCreateNews();

  function onSubmit(values: z.infer<typeof createNewsSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("images", selectedFile as Blob);

    mutate(formData, {
      onSuccess: () => {
        refetch();
        toast.success("Data news berhasil ditambahkan", {
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
        toast.error("Gagal menambahkan data news", {
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
  }

  type News = {
    id: string | number;
    title: string;
    manageButton?: () => void;
  };

  const columns: ColumnDef<News>[] = [
    { header: "No", cell: (cell) => cell.row.index + 1 },
    {
      accessorKey: "title",
      header: "News Title",
    },
    {
      accessorKey: "option",
      header: "Opsi",
      cell: (cell) => (
        <section className="flex w-full justify-center py-2">
          <Link
            to={`/dashboard/news/manage/${cell.row.original.id}`}
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

  const categories = [
    {
      id: 1,
      name: "Kesehatan reproduksi",
    },
    {
      id: 2,
      name: "Kesehatan kardiovaskular",
    },
    {
      id: 3,
      name: "Kesehatan kulit",
    },
    {
      id: 4,
      name: "Kesehatan anak",
    },
    {
      id: 5,
      name: "Kesehatan perempuan",
    },
    {
      id: 6,
      name: "Kehamilan",
    },
    {
      id: 7,
      name: "Program",
    },
    {
      id: 8,
      name: "Bahan Herbal",
    },
    {
      id: 9,
      name: "Teknologi herbal",
    },
    {
      id: 10,
      name: "Report kegiatan",
    },
  ];

  return (
    <AdminLayout>
      <section className="flex h-[510px] w-full justify-between pt-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container flex h-full w-[48%] flex-col justify-evenly rounded-md border"
          >
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
                  className={`flex w-[75%] items-center truncate rounded-md border border-[#CBD5E1] pl-2 text-sm text-font-input hover:bg-slate-100 ${isPending ? "cursor-not-allowed opacity-40 hover:bg-slate-100" : "hover:cursor-pointer"}`}
                >
                  {selectedFile ? selectedFile.name : "Choose image to upload"}
                </Label>
                <label
                  htmlFor="image"
                  className={`relative grid w-32 place-items-center rounded-md bg-[#0F172A] pt-2 text-sm text-white hover:bg-slate-700 ${isPending ? "cursor-not-allowed opacity-10 hover:bg-[#0F172A]" : "cursor-pointer"}`}
                >
                  Browse file
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    disabled={isPending}
                    onChange={handleFileChange}
                  />
                </label>
              </section>
            </section>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel
                    className={`text-sm ${form.formState.errors.title ? "text-red-400" : "text-[#0F172A]"}`}
                  >
                    News Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Input news title"
                      disabled={isPending}
                      className={
                        form.formState.errors.title
                          ? "border-red-400 placeholder:text-red-400"
                          : ""
                      }
                      {...field}
                    />
                  </FormControl>
                  <section className="w-full">
                    <p className="text-xs font-bold text-red-400">
                      {form.formState.errors.title?.message}
                    </p>
                  </section>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1 text-font-input">
                  <FormLabel
                    className={`text-sm ${form.formState.errors.category ? "text-red-400" : "text-[#0F172A]"}`}
                  >
                    Category
                  </FormLabel>
                  <section className="flex h-10 select-none items-center rounded-md border text-sm text-[#0F172A]">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`w-full focus:ring-0 focus:ring-offset-0 ${form.formState.errors.category ? "border-red-400 text-red-400" : ""}`}
                        >
                          <SelectValue placeholder="Select category news" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {categories.map(({ id, name }) => (
                            <SelectItem key={id} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </section>
                  <section className="w-full">
                    <p className="text-xs font-bold text-red-400">
                      {form.formState.errors.category?.message}
                    </p>
                  </section>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-1">
                  <FormLabel
                    className={`text-sm ${form.formState.errors.description ? "text-red-400" : "text-[#0F172A]"}`}
                  >
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Type your message here"
                      className={`h-14 resize-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0 ${form.formState.errors.description ? "border-red-400 placeholder:text-red-400" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <section className="w-full">
                    <p className="text-xs font-bold text-red-400">
                      {form.formState.errors.description?.message}
                    </p>
                  </section>
                </FormItem>
              )}
            />
            <section className="flex w-full justify-end gap-2 py-2">
              <Button
                size={"sm"}
                disabled={isPending}
                type="button"
                onClick={() => navigate("/dashboard/news")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size={"sm"}
                disabled={!form.formState.isValid || !selectedFile || isPending}
                className="gap-1 bg-bright-2 font-bold text-font-black-3 hover:bg-bright-1"
              >
                {isPending && <Loader2 className="w-4 animate-spin" />} Add News{" "}
                <MdOutlineAddBox className="text-xl" />
              </Button>
            </section>
          </form>
        </Form>
        <section className="flex h-full w-[48%]">
          <DataTable columns={columns} data={news.data} />
        </section>
      </section>
    </AdminLayout>
  );
};
