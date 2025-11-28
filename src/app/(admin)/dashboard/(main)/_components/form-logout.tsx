"use client";

import { ActionResult } from "@/types";
import { Link, LogOut } from "lucide-react";
import React, { useActionState } from "react";
import { useFormState } from "react-dom";
import { Logout } from "../lib/action";
const initialState: ActionResult = {
	error: "",
};
const FormLogout = () => {
	const [state, FormAction] = useActionState(Logout, initialState);
	return (
		<div>
			<form action={FormAction}>
				<button type="submit">
					<LogOut></LogOut>
				</button>
			</form>
		</div>
	);
};

export default FormLogout;
