"use server";
// Tandanya: kode ini jalan di server (bukan di browser).
// Jadi cocok untuk proses login, register, database, dll.

import { schemaSignIn } from "@/lib/schema";
import bcrypt from "bcrypt";
import { ActionResult } from "@/types";
// Import tipe hasil fungsi (supaya lebih rapih pakai TypeScript).
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
// Import fungsi bawaan Next.js untuk pindah halaman (redirect).
// Fungsi SignIn akan dipanggil saat form di-submit
export async function SignIn(
	_: unknown, // Parameter pertama (nggak dipakai, jadi dikasih nama "_")
	formData: FormData // Parameter kedua, berisi semua data form yang dikirim user
): Promise<ActionResult> {
	const validate = schemaSignIn.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});
	//safe parse itu ngecek data kalau valid succesnya truee dna tampilkan data kalau tidak dia error

	if (!validate.success) {
		console.log(validate); // log dulu

		return {
			error: validate.error.issues[0].message,
		};
	}
	const existingUser = await prisma.user.findFirst({
		where: {
			email: validate.data.email,
			type: "superadmin",
		},
	});
	if (!existingUser) {
		return {
			error: "email not founcd",
		};
	}
	const comparePassword = bcrypt.compareSync(
		validate.data.password,
		existingUser.password
	);
	if (!comparePassword) {
		return {
			error: "password in correct",
		};
	}
	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	(await cookies()).set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	// Setelah ambil data form, user langsung diarahkan ke halaman lain
	// Dalam contoh ini, user dipindahkan ke /dashboard/sign-in
	return redirect("/dashboard/");
}
