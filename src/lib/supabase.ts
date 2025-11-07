import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);
//fungsi untuk ambil gambar dari supabase stoange dari bucket dengan nama belanja
export const getImageUrl = (
	name: string,
	path: "brands" | "products" = "brands"
) => {
	const { data } = supabase.storage
		.from("belanja")
		.getPublicUrl(`public/${path}/${name}`);
	return data.publicUrl;
};
// fungsi untuk upload file ke buckedt belanja
export const uploadFile = async (
	file: File,
	path: "brands" | "products" = "brands"
) => {
	const fileType = file.type.split("/")[1];
	const fileName = `${path}-${Date.now()}.${fileType}`;

	await supabase.storage
		.from("belanja") //samakan bukcet kita di database
		.upload(`public/${path}/${fileName}`, file, {
			cacheControl: "3600",
			upsert: false,
		});
	return fileName;
};
//fungsi hapus file dari bucket belanja
export const deleteFile = async (
	filename: string,
	path: "brands" | "products" = "brands"
) => {
	await supabase.storage.from("belanja").remove([`public/${path}/${filename}`]);
};
