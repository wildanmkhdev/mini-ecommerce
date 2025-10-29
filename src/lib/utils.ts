// Import clsx untuk menggabungkan className secara dinamis
import { clsx, type ClassValue } from "clsx";
// Import twMerge untuk mengatasi konflik class Tailwind (misalnya bg-red vs bg-blue)
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

// Buat fungsi utilitas cn
export function cn(...inputs: ClassValue[]) {
	// clsx akan menggabungkan class input (bisa string, array, object, atau kondisi)
	// lalu twMerge akan memastikan class Tailwind yang bentrok digabung dengan benar
	return twMerge(clsx(inputs));
}
export function rupiahformat(value: number) {
	return Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(value);
}

export function dateFormat(date: Date | null, format = "DD MMMM") {
	if (!date) {
		return dayjs().format(format);
	}
	return dayjs(date).format;
}

// Contoh penggunaan di komponen React:
// cn("p-4", "bg-red-500", isActive && "text-white", "bg-blue-500")
// hasil -> "p-4 text-white bg-blue-500"
// (bg-red-500 digantikan oleh bg-blue-500 karena twMerge)
