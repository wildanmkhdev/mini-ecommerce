import { z } from "zod";

// Perbaikan typo dan buat readonly
export const ALLOW_MIME_TYPES = [
	"image/jpg",
	"image/jpeg",
	"image/png",
] as const;

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
		.string({ required_error: "name is required" })
		.min(4, { message: "name minimal 4 karakter" }),
});

// schemaBrand extend dari schemaCategory, lalu tambahkan field image
export const schemaBrand = schemaCategory.extend({
	image: z
		.any()
		.refine(
			(file) =>
				file instanceof File && ALLOW_MIME_TYPES.includes((file as File).type),
			{ message: "File tidak valid (harus berformat jpg/jpeg/png)" }
		)
		.refine((file: File) => file?.name, { message: "image is required" }),
});
