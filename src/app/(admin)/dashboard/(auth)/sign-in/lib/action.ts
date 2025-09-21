"use server";
// Tandanya: kode ini jalan di server (bukan di browser).
// Jadi cocok untuk proses login, register, database, dll.

import { ActionResult } from "@/types";
// Import tipe hasil fungsi (supaya lebih rapih pakai TypeScript).

import { redirect } from "next/navigation";
// Import fungsi bawaan Next.js untuk pindah halaman (redirect).
// Fungsi SignIn akan dipanggil saat form di-submit
export async function SignIn(
	_: unknown, // Parameter pertama (nggak dipakai, jadi dikasih nama "_")
	formData: FormData // Parameter kedua, berisi semua data form yang dikirim user
): Promise<ActionResult> {
	// Ambil isi input form dengan name="email"
	// Contoh: kalau user isi email "wildan@gmail.com", maka itu yang diambil
	console.log(formData.get("email"));
	// Setelah ambil data form, user langsung diarahkan ke halaman lain
	// Dalam contoh ini, user dipindahkan ke /dashboard/sign-in
	return redirect("/dashboard/sign-in");
}
