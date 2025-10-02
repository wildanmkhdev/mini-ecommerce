import { z } from "zod";
//kita buat dulu chema buat validasi form kita
export const schemaSignIn = z.object({
	email: z
		.string({ required_error: "Email wajib diisi" })
		.email({ message: "Format email tidak valid" }),
	password: z
		.string({ required_error: "Password wajib diisi" })
		.min(5, { message: "Password minimal 5 karakter" }),
});

export const schemaCategory = z.object({
	name: z
		.string({
			required_error: "name is required",
		})
		.min(4, { message: "name minimal 4 karakter" }),
});
