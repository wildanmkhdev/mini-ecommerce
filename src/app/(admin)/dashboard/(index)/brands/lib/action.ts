"use server";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

export default async function postBrand(
	_: unknown,
	formData: FormData
): Promise<ActionResult> {
	console.log(formData.get("name"));
	return redirect("/dashboard/brands");
}
