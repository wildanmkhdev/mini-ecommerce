import React from "react";
import { getCategoryById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/form-category";
//props params

type Tparams = {
	id: string;
};
interface EditPageProps {
	params: Tparams;
}
export default async function EditPage({ params }: EditPageProps) {
	// console.log(params.id);
	const data = await getCategoryById(params.id);
	if (!data) {
		return redirect("/dashboard/categories");
	}
	console.log(data);

	return <FormCategory type="EDIT" data={data}></FormCategory>;
}
