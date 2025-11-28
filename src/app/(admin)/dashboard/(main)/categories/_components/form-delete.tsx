"use client";

import { Button } from "@/components/ui/button";
import { ActionResult } from "@/types";
import { TrashIcon } from "lucide-react";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteCategory } from "../lib/actions";
const initialState: ActionResult = {
	error: "",
};
interface FormDeleteProps {
	id: number;
}
function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button variant="destructive" size="sm" disabled={pending} type="submit">
			<TrashIcon className="w-4 h-4" /> {pending ? "loding" : "delete"}
		</Button>
	);
}
export default function FormDelete({ id }: FormDeleteProps) {
	const deleteCategoryWithId = (_: unknown, formData: FormData) =>
		deleteCategory(_, formData, id);
	const [state, formAction] = useFormState(deleteCategoryWithId, initialState);
	return (
		<form action={formAction}>
			<SubmitButton></SubmitButton>
		</form>
	);
}
