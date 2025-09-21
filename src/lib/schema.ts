import { z } from "zod";

export const schemaSignIn = z.object({
	email: z
		.string({ required_error: "Email wajib diisi" })
		.email({ message: "Format email tidak valid" }),
	password: z
		.string({ required_error: "Password wajib diisi" })
		.min(5, { message: "Password minimal 5 karakter" }),
});
