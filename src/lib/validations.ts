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

export const courseSchema = z.object({
  title: z
    .string({ required_error: "Title wajib diisi" })
    .min(20, { message: "Title minimal 20 karakter" })
    .max(100, { message: "Title maksimal 100 karakter" }),
  description: z
    .string({ required_error: "Deskripsi wajib diisi" })
    .min(1, {
      message: "Deskripsi wajib diisi",
    })
    .max(2000, { message: "Deskripsi maksimal 2000 karakter" }),
});

export const newsSchema = z.object({
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
    .max(5000, { message: "Deskiprsi maksimal 5000 karakter" }),
});

export const userSchema = z
  .object({
    username: z
      .string({ required_error: "Username wajib diisi" })
      .min(6, { message: "Username minimal 6 karakter" })
      .max(100, { message: "Username maksimal 100 karakter" }),
    password: z
      .string({ required_error: "Password wajib diisi" })
      .min(8, { message: "Password minimal 8 karakter" })
      .max(200, { message: "Password maksimal 200 karakter" }),
    confirmation_password: z
      .string({
        required_error: "Konfirmasi password wajib diisi",
      })
      .min(8, { message: "Konfirmasi password minimal 8 karakter" })
      .max(200, { message: "Konfirmasi password maksimal 200 karakter" }),
  })
  .refine((data) => data.password === data.confirmation_password, {
    message: "Kata sandi harus sama",
    path: ["confirmation_password"],
  });
