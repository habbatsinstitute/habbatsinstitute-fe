import { FC, ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LuTrash, LuSave, LuPenLine } from "react-icons/lu";
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
import { TNewsItems, newsSchema, useGetCategories } from "@/lib";

export const DashboardNewsManage: FC = (): ReactElement => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: categories } = useGetCategories();

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

  function onSubmit(values: z.infer<typeof newsSchema>) {
    console.log(values);
    console.log(selectedFile);
  }

  const columns: ColumnDef<TNewsItems>[] = [
    { header: "No", cell: (cell) => cell.row.index + 1 },
    {
      accessorKey: "news",
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

  return (
    <AdminLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-[510px] w-full justify-between pt-7"
        >
          <section className="container flex h-full w-[48%] flex-col justify-evenly rounded-md border">
            <h1 className="mt-5 text-lg font-black text-[#0F172A]">
              Edit News
            </h1>
            <p className="w-3/4 text-xs text-[#64748B]">
              Isi form input dibawah dengan benar.
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
              >
                Cancel
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size={"sm"}
                    type="button"
                    variant={"destructive"}
                    className="flex gap-1"
                  >
                    Delete
                    <LuTrash />
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
                      <span className="font-bold">"{"News"}"</span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      className="bg-[#DC5E5E] hover:bg-red-400"
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
              >
                Save <LuSave className="text-lg" />
              </Button>
            </section>
          </section>
          <section className="flex h-full w-[48%]">
            <DataTable columns={columns} data={[]} />
          </section>
        </form>
      </Form>
    </AdminLayout>
  );
};
