import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Slide, toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { LuTrash, LuSave, LuPenLine, LuLoader2 } from "react-icons/lu";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  DataTable,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
  Label,
} from "@/components";
import {
  TGetNewsResponse,
  TNewsItems,
  api,
  newsSchema,
  useGetCategories,
  useGetNewsById,
  useRemoveNews,
  useUpdateNews,
} from "@/lib";

export const DashboardNewsManage: FC = (): ReactElement => {
  const [news, setNews] = useState<TNewsItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const id = useParams();

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

  const { data: categories } = useGetCategories();
  const {
    data: getNewsById,
    refetch: refetchNewsById,
    isFetching: isFetchingNewsById,
  } = useGetNewsById(id?.id);
  const { mutate: update, isPending: isPendingUpdate } = useUpdateNews(id?.id);
  const { mutate: remove, isPending: isPendingRemove } = useRemoveNews();

  const navigate = useNavigate();

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

  useEffect(() => {
    refetchNewsById();
    form.reset(getNewsById?.data);
  }, [form, form.reset, getNewsById?.data, id, refetchNewsById]);

  function onSubmit(values: z.infer<typeof newsSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    if (selectedFile) {
      formData.append("images", selectedFile as Blob);
    }

    update(formData, {
      onSuccess: () => {
        getNews();
        toast.success("Data news berhasil diupdate", {
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
        navigate("/dashboard/news");
      },
      onError: () => {
        toast.error("Gagal update data news", {
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
            onClick={() => {
              navigate(`/dashboard/news/manage/${cell.row.original.id}`);
            }}
            disabled={isFetchingNewsById || isPendingUpdate || isPendingRemove}
          >
            {isFetchingNewsById || isPendingUpdate || isPendingRemove ? (
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-[1000px] w-full flex-col justify-between gap-10 pt-7 md:gap-0 xl:h-[510px] xl:flex-row"
        >
          <section className="container flex h-full w-full flex-col justify-evenly gap-3 rounded-md border py-5 lg:gap-0 xl:w-[48%] xl:py-0">
            <h1 className="mt-5 text-lg font-black text-[#0F172A]">
              Edit News
            </h1>
            <p className="w-3/4 text-xs text-[#64748B]">
              Isi form input dibawah dengan benar.
            </p>
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
              <section className="flex h-10 w-full justify-between gap-3">
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
                  } pl-2 text-sm  hover:bg-slate-100 ${isPendingUpdate || isPendingRemove ? "cursor-not-allowed opacity-40 hover:bg-slate-100" : "hover:cursor-pointer"}`}
                >
                  {selectedFile ? selectedFile.name : "Choose image to upload"}
                </Label>
                <label
                  htmlFor="image"
                  className={`relative grid w-32 place-items-center rounded-md bg-[#0F172A] pt-2 text-sm text-white hover:bg-slate-700 ${isPendingUpdate || isPendingRemove || isFetchingNewsById ? "cursor-not-allowed opacity-30 hover:bg-[#0F172A]" : "cursor-pointer"}`}
                >
                  {isFetchingNewsById || isPendingUpdate || isPendingRemove ? (
                    <LuLoader2 className="animate-spin" />
                  ) : (
                    "Browse file"
                  )}
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={
                      isPendingUpdate || isPendingRemove || isFetchingNewsById
                    }
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
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Input news title"
                      className={
                        form.formState.errors.title
                          ? "border-red-400 placeholder:text-red-400"
                          : ""
                      }
                      disabled={
                        isPendingUpdate || isPendingRemove || isFetchingNewsById
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
                <FormItem className="flex w-full flex-col text-font-input">
                  <FormLabel
                    className={`text-sm ${form.formState.errors.category ? "text-red-400" : "text-[#0F172A]"}`}
                  >
                    Category
                  </FormLabel>
                  <section className="flex h-10 select-none items-center rounded-md border text-sm text-[#0F172A]">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={
                        isPendingUpdate || isPendingRemove || isFetchingNewsById
                      }
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`w-full focus:ring-0 focus:ring-offset-0 ${form.formState.errors.category ? "border-red-400 text-red-400" : ""}`}
                        >
                          <SelectValue
                            placeholder={getNewsById?.data?.category}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
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
                  <FormControl>
                    <Textarea
                      id="news-description"
                      placeholder="Type your message here"
                      className={`h-14 resize-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0 ${form.formState.errors.description ? "border-red-400 placeholder:text-red-400" : ""}`}
                      disabled={
                        isPendingUpdate || isPendingRemove || isFetchingNewsById
                      }
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
                type="button"
                onClick={() => navigate("/dashboard/news")}
                disabled={
                  isPendingUpdate || isPendingRemove || isFetchingNewsById
                }
              >
                {isFetchingNewsById || isPendingUpdate || isPendingRemove ? (
                  <LuLoader2 className="w-14 animate-spin" />
                ) : (
                  "Cancel"
                )}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size={"sm"}
                    type="button"
                    variant={"destructive"}
                    className="flex gap-1"
                    disabled={
                      isPendingUpdate || isPendingRemove || isFetchingNewsById
                    }
                  >
                    {isFetchingNewsById ||
                    isPendingUpdate ||
                    isPendingRemove ? (
                      <LuLoader2 className="w-14 animate-spin" />
                    ) : (
                      <Fragment>
                        Delete
                        <LuTrash />
                      </Fragment>
                    )}
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
                      <span className="font-bold">
                        "{getNewsById?.data.title}"
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      className="bg-[#DC5E5E] hover:bg-red-400"
                      onClick={() =>
                        remove(id?.id, {
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
                            navigate("/dashboard/news");
                          },
                          onError: () => {
                            toast.error("Gagal menghapus data news", {
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
                      Delete data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                size={"sm"}
                type="submit"
                className="gap-1 bg-bright-2 font-bold text-font-black-3 hover:bg-bright-1"
                disabled={
                  !form.formState.isValid ||
                  isPendingUpdate ||
                  isPendingRemove ||
                  isFetchingNewsById ||
                  (selectedFile !== null &&
                    selectedFile?.type !== "image/jpg" &&
                    selectedFile?.type !== "image/jpeg" &&
                    selectedFile?.type !== "image/png") ||
                  (selectedFile !== null && selectedFile?.size > 2000000)
                }
              >
                {(isPendingRemove || isFetchingNewsById || isPendingUpdate) && (
                  <LuLoader2 className="mx-7 w-full animate-spin" />
                )}
                {!isPendingRemove &&
                  !isFetchingNewsById &&
                  !isPendingUpdate && (
                    <Fragment>
                      Save <LuSave className="text-lg" />
                    </Fragment>
                  )}
              </Button>
            </section>
          </section>
          <section className="flex h-full w-full md:mt-10 xl:mt-0 xl:w-[48%]">
            <DataTable columns={columns} data={news} loading={loading} />
          </section>
        </form>
      </Form>
    </AdminLayout>
  );
};
