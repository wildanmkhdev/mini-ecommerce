"use server";

import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { ProductStock } from "@prisma/client";

export async function storeProduct(
	_: unknown,
	formData: FormData
): Promise<ActionResult> {
	// ✅ Parsing data dari form
	const parse = schemaProduct.safeParse({
		name: formData.get("name"),
		price: formData.get("price"),
		description: formData.get("description"),
		brand_id: formData.get("brand_id"),
		category_id: formData.get("category_id"),
		location_id: formData.get("location_id"),
		stock: formData.get("stock"),
		images: formData.getAll("images"), // pastikan name di input adalah "images"
	});

	// ✅ Validasi jika gagal parse
	if (!parse.success) {
		console.error("❌ PRODUCT VALIDATION FAILED:");
		console.error(parse.error.flatten());
		console.error(
			"🧩 FormData received:",
			Object.fromEntries(formData.entries())
		);
		return { error: "Invalid product data" };
	}

	// ✅ Cegah error kalau images kosong
	const uploaded_images = (parse.data.images || []) as File[];
	const filenames: string[] = [];

	// ✅ Upload gambar ke Supabase
	for (const image of uploaded_images) {
		if (image instanceof File) {
			const filename = await uploadFile(image, "products");
			filenames.push(filename);
		}
	}

	// ✅ Simpan ke database
	try {
		await prisma.product.create({
			data: {
				name: parse.data.name,
				description: parse.data.description,
				category_id: Number.parseInt(parse.data.category_id),
				location_id: Number.parseInt(parse.data.location_id),
				brand_id: Number.parseInt(parse.data.brand_id),
				price: Number.parseInt(parse.data.price),
				stock: parse.data.stock as ProductStock,
				images: filenames, // pastikan field di database bernama "images"
			},
		});
	} catch (error) {
		console.error(error);
		return { error: "Failed to insert product" };
	}

	// ✅ Redirect setelah sukses
	return redirect("/dashboard/products");
}
export async function updateProduct(
	_: unknown,
	formData: FormData,
	id: number
): Promise<ActionResult> {
	const parse = schemaProductEdit.safeParse({
		name: formData.get("name"),
		price: formData.get("price"),
		description: formData.get("description"),
		brand_id: formData.get("brand_id"),
		category_id: formData.get("category_id"),
		location_id: formData.get("location_id"),
		stock: formData.get("stock"),
		id: id,
	});

	// ✅ Validasi jika gagal parse
	if (!parse.success) {
		console.error("❌ PRODUCT VALIDATION FAILED:");
		console.error(parse.error.flatten());
		console.error(
			"🧩 FormData received:",
			Object.fromEntries(formData.entries())
		);
	}
	const product = await prisma.product.findFirst({
		where: {
			id: id,
		},
	});
	if (!product) {
		return {
			error: "product not found",
		};
	}
	const uploaded_images = formData.getAll("images") as File[];
	let filenames = [];
	if (uploaded_images.length === 3) {
		const parseImages = schemaProduct.pick({ images: true }).safeParse({
			images: uploaded_images,
		});
		if (!parseImages.success) {
			return {
				error: "failed to upload images",
			};
		}
		for (const image of uploaded_images) {
			if (image instanceof File) {
				const filename = await uploadFile(image, "products");
				filenames.push(filename);
			}
		}
	} else {
		filenames = product.images;
	}
	try {
		await prisma.product.update({
			where: {
				id: id,
			},
			data: {
				name: formData.get("name") as string,
				price: Number(formData.get("price")),
				description: formData.get("description") as string,
				brand_id: Number(formData.get("brand_id")),
				category_id: Number(formData.get("category_id")),
				location_id: Number(formData.get("location_id")),
				stock: formData.get("stock") as any, // tergantung tipe enum ProductStock
				images: filenames,
			},
		});
	} catch (error) {
		console.error("Failed to update product:", error);
	}
	return redirect("/dashboard/products");
}
