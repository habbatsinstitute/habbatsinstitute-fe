import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
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
import {
  TGetNewsResponse,
  TNewsItems,
  api,
  newsSchema,
  useCreateNews,
  useGetCategories,
} from "@/lib";

export const DashboardNewsCreate: FC = (): ReactElement => {
  const [news, setNews] = useState<TNewsItems[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof newsSchema>>({
    resolver: zodResolver(newsSchema),
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

  const { mutate, isPending } = useCreateNews();
  const { data: categories } = useGetCategories();

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

  function onSubmit(values: z.infer<typeof newsSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("images", selectedFile as Blob);

    mutate(formData, {
      onSuccess: () => {
        getNews();
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

  const columns: ColumnDef<TNewsItems>[] = [
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
          <Button
            className="flex h-7 w-28 items-center justify-center gap-1 rounded-md bg-bright-2 text-font-black-3 hover:bg-bright-1"
            disabled={isPending}
            onClick={() => {
              navigate(`/dashboard/news/manage/${cell.row.original.id}`);
            }}
          >
            {isPending ? (
              <Loader2 className="w-4 animate-spin" />
            ) : (
              <Fragment>
                <LuPenLine className="text-xl" />
                Manage
              </Fragment>
            )}
          </Button>
        </section>
      ),
    },
  ];

  return (
    <AdminLayout>
      <section className="flex min-h-[500px] w-full flex-col justify-between gap-10 pt-7 md:gap-0 xl:min-h-[510px] xl:flex-row">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container flex h-full w-full flex-col justify-evenly gap-3 rounded-md border py-5 lg:gap-0 xl:w-[48%] xl:py-0"
          >
            <h1 className="mt-5 text-[1rem] font-black text-[#0F172A]">
              Add News
            </h1>
            <section className="flex w-full flex-col gap-1">
              <h2
                className={`text-sm ${
                  (selectedFile &&
                    selectedFile.type !== "image/jpeg" &&
                    selectedFile.type !== "image/png" &&
                    selectedFile.type !== "image/jpg") ||
                  (selectedFile && selectedFile.size > 2000000)
                    ? "text-red-400"
                    : "text-[#0F172A]"
                } hover:cursor-default`}
              >
                Image Cover
              </h2>
              <section className="flex h-8 w-full justify-between gap-3">
                <Label
                  htmlFor="image"
                  className={`flex w-[75%] items-center truncate rounded-md border ${
                    (selectedFile &&
                      selectedFile.type !== "image/jpeg" &&
                      selectedFile.type !== "image/png" &&
                      selectedFile.type !== "image/jpg") ||
                    (selectedFile && selectedFile.size > 2000000)
                      ? "border-red-400 text-red-400"
                      : "border-[#CBD5E1] text-font-input"
                  } pl-2 text-sm hover:bg-slate-100 ${
                    isPending
                      ? "cursor-not-allowed opacity-40 hover:bg-slate-100"
                      : "hover:cursor-pointer"
                  }`}
                >
                  {selectedFile ? selectedFile.name : "Choose image to upload"}
                </Label>

                <label
                  htmlFor="image"
                  className={`relative grid w-32 place-items-center rounded-md bg-[#0F172A] pt-1 text-sm text-white hover:bg-slate-700 ${isPending ? "cursor-not-allowed opacity-10 hover:bg-[#0F172A]" : "cursor-pointer"}`}
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
              {selectedFile &&
                selectedFile.type !== "image/jpg" &&
                selectedFile.type !== "image/jpeg" &&
                selectedFile.type !== "image/png" && (
                  <section className="w-full">
                    <p className="text-xs font-bold text-red-400">
                      Hanya mengizinkan format gambar JPG, JPEG, dan PNG
                    </p>
                  </section>
                )}
              {selectedFile && selectedFile?.size > 2000000 && (
                <section className="w-full">
                  <p className="text-xs font-bold text-red-400">
                    File tidak boleh lebih dari 2 MB
                  </p>
                </section>
              )}
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
                  <div className="h-7">
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
                  </div>
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
                <FormItem className="flex w-full flex-col text-font-input">
                  <FormLabel
                    className={`text-sm ${form.formState.errors.category ? "text-red-400" : "text-[#0F172A]"}`}
                  >
                    Category
                  </FormLabel>
                  <section className="flex h-7 select-none items-center rounded-md border text-sm text-[#0F172A]">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`h-9 w-full focus:ring-0 focus:ring-offset-0 ${form.formState.errors.category ? "border-red-400 text-red-400" : ""}`}
                        >
                          <SelectValue placeholder="Select category news" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="h-[200px] xl:h-[150px]">
                          <SelectLabel>Category</SelectLabel>
                          {categories?.data?.map(({ id, name }) => (
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
                <FormItem className="flex w-full flex-col">
                  <FormLabel
                    className={`text-sm ${form.formState.errors.description ? "text-red-400" : "text-[#0F172A]"}`}
                  >
                    Description
                  </FormLabel>
                  <div className="h-36">
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Type your message here"
                        className={`h-full resize-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0 ${form.formState.errors.description ? "border-red-400 placeholder:text-red-400" : ""}`}
                        {...field}
                      />
                    </FormControl>
                  </div>

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
                disabled={
                  !form.formState.isValid ||
                  !selectedFile ||
                  isPending ||
                  (selectedFile.type !== "image/jpeg" &&
                    selectedFile.type !== "image/png" &&
                    selectedFile.type !== "image/jpg") ||
                  selectedFile.size > 2000000
                }
                className="gap-1 bg-bright-2 font-bold text-font-black-3 hover:bg-bright-1"
              >
                {isPending && <Loader2 className="w-4 animate-spin" />} Add News{" "}
                <MdOutlineAddBox className="text-xl" />
              </Button>
            </section>
          </form>
        </Form>
        <section className="flex h-full w-full flex-col py-10 md:mt-10 lg:py-0 xl:mt-0 xl:w-[48%]">
          <DataTable columns={columns} data={news} loading={loading} />
        </section>
      </section>
    </AdminLayout>
  );
};
