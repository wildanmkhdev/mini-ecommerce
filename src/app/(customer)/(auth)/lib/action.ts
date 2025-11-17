"use server";

import { schemaSignIn } from "@/lib/schema";
import { ActionResult } from "@/types";
import prisma from "../../../../../lib/prisma";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function signIn(
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
			type: "customer",
		},
	});
	if (!existingUser) {
		return {
			error: "email kamu tidak terdaftar",
		};
	}
	const comparePassword = bcrypt.compareSync(
		validate.data.password,
		existingUser.password
	);
	if (!comparePassword) {
		return {
			error: "maaf.. Password yang kamu masukan salah",
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
	return redirect("/");
}
