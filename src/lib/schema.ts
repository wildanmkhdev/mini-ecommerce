import { z } from "zod";

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

export const schemaBrand = schemaCategory.extend({
	image: z
		.any()
		.refine(
			(file) =>
				file instanceof File && ALLOW_MIME_TYPES.includes((file as File).type),
			{ message: "File tidak valid (harus berformat jpg/jpeg/png)" }
		)
		.refine((file) => !!file?.name, { message: "image is required" }),
});

export const schemaProduct = z.object({
	name: z
		.string({ required_error: "name is required" })
		.min(4, { message: "name minimal 4 karakter" }),
	description: z
		.string({ required_error: "description is required" })
		.min(10, { message: "description minimal 10 karakter" }),
	price: z.string({ required_error: "price is required" }),
	stock: z.string({ required_error: "stock is required" }),
	brand_id: z.string({ required_error: "brand is required" }),
	category_id: z.string({ required_error: "category is required" }),
	location_id: z.string({ required_error: "location is required" }),
	images: z
		.any()
		.refine((files: File[]) => files?.length === 3, {
			message: "please upload exactly 3 image product",
		})
		.refine(
			(files: File[]) =>
				files.every((file) => ALLOW_MIME_TYPES.includes(file.type)),
			{ message: "uploaded file should be jpg/jpeg/png" }
		),
});

export const schemaProductEdit = schemaProduct
	.extend({
		id: z.number({
			required_error: "product ",
		}),
	})
	.omit({ images: true });

export const schemaSignUp = schemaSignIn.extend({
	name: z
		.string({ required_error: "name is required" })
		.min(4, { message: "name minimal 4 karakter" }),
});
