"use server";

import { schemaProduct } from "@/lib/schema";
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
