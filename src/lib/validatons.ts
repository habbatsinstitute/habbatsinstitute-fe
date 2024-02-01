import * as z from "zod";

export const loginSchema = z.object({
  username: z
    .string({ required_error: "Username wajib diisi" })
    .min(1, { message: "Username wajib diisi" })
    .max(50, { message: "Username maksimal 50 karakter" }),
  password: z
    .string({ required_error: "Password wajib diisi" })
    .min(1, {
      message: "Password wajib diisi",
    })
    .max(50, { message: "Password maksimal 50 karakter" }),
});

export const createCourseSchema = z.object({
  title: z
    .string({ required_error: "Title wajib diisi" })
    .min(1, { message: "Title wajib diisi" })
    .max(100, { message: "Title maksimal 50 karakter" }),
  description: z
    .string({ required_error: "Deskripsi wajib diisi" })
    .min(1, {
      message: "Deskripsi wajib diisi",
    })
    .max(5000, { message: "Deskiprsi maksimal 2000 karakter" }),
});

export const createNewsSchema = z.object({
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
