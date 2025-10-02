"use server";

import { schemaCategory } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export default async function postCategory(
	_: unknown,
	formData: FormData
): Promise<ActionResult> {
	// Ambil data dari form
	const data = {
		name: formData.get("name"),
	};

	// Validasi pakai schemaCategory
	const validate = schemaCategory.safeParse(data);

	if (!validate.success) {
		// Ambil pesan error pertama dari Zod
		const firstError = validate.error.issues[0]?.message;
		return { error: firstError || "Validation failed" };
	}
	// code buat query masukkan data ke datbase melalui prisma yg sudha terlewat validasi
	try {
		await prisma.category.create({
			data: {
				name: validate.data.name,
			},
		});
	} catch (error) {
		console.log(error);
		return redirect("/dashboard/categories/create");
	}

	// Kalau validasi sukses → redirect
	return redirect("/dashboard/categories");
}

export async function updateCategory(
	_: unknown,
	formData: FormData,
	id: number | undefined
): Promise<ActionResult> {
	console.log(id);

	return redirect("/dashboard/categories");
}
