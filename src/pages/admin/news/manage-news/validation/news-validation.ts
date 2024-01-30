import * as z from "zod";

export const manageNewsSchema = z.object({
  title: z
    .string({ required_error: "Title wajib diisi" })
    .min(1, { message: "Title wajib diisi" })
    .max(100, { message: "Title maksimal 50 karakter" }),
  category: z
    .string({ required_error: "Kategori wajib dipilih" })
    .min(1, { message: "Kategori wajib diisi" }),
  description: z
    .string({ required_error: "Deskripsi wajib diisi" })
    .min(1, {
      message: "Deskripsi wajib diisi",
    })
    .max(5000, { message: "Deskiprsi maksimal 2000 karakter" }),
});
