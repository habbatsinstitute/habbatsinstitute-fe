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
