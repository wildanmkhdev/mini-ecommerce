"use server";

import { schemaCategory } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { Prisma } from "@prisma/client";

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
		await prisma.location.create({
			data: {
				name: validate.data.name,
			},
		});
	} catch (error) {
		console.error("Update error:", error);
		return { error: "Gagal insert Kategori" };
	}

	// Kalau validasi sukses → redirect
	return redirect("/dashboard/locations");
}
export async function updateCategory(
	_: unknown,
	formData: FormData,
	id: number | undefined
): Promise<ActionResult> {
	// Ambil data dari form
	const data = {
		name: formData.get("name"),
	};

	// Validasi pakai schemaCategory
	const validate = schemaCategory.safeParse(data);

	if (!validate.success) {
		const firstError = validate.error.issues[0]?.message;
		return { error: firstError || "Validation failed" };
	}

	if (id === undefined) {
		return { error: "ID tidak ditemukan" };
	}

	try {
		await prisma.location.update({
			where: {
				id: Number(id),
			},
			data: {
				name: validate.data.name,
			},
		});
	} catch (error) {
		console.error("Update error:", error);
		return { error: "Gagal Mengupdate Kategori" };
	}

	// Sukses → redirect ke daftar kategori
	return redirect("/dashboard/locations");
}

export async function deleteCategory(
	_: unknown,
	formData: FormData,
	id: number
): Promise<ActionResult> {
	try {
		await prisma.location.delete({
			where: {
				id,
			},
		});
	} catch (error) {
		console.log(error);
		return {
			error: "failde to delet dta",
		};
	}

	return redirect("/dashboard/locations");
}
