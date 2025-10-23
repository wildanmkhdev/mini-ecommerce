import { Tedit } from "@/types";
import React from "react";
import FormBrand from "../../_components/form-brand";
import { getBrandById } from "../../lib/data";
import { redirect } from "next/dist/server/api-utils";

export default async function EditPage({ params }: Tedit) {
	const brand = await getBrandById(params.id);
	console.log(brand);
	if (!brand) {
		return redirect("/dashboard/brands");
	}

	return <FormBrand type="EDIT" data={brand}></FormBrand>;
}
