"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { SignIn } from "../lib/action";
import { ActionResult } from "@/types";
const initialState: ActionResult = {
	error: "",
};
function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			className="w-full pointer-events-auto"
			disabled={pending}>
			{pending ? "loading..." : "sign in"}
		</Button>
	);
}

const FormSignIn = () => {
	const [state, FormAction] = useActionState(SignIn, initialState);
	//state nyimpan hasil action
	//formaction agar tahu form memanggil sinin ketika di submit
	// useActionState gunanya buat bikin form lebih mudah terhubung ke server action + otomatis punya state hasilnya.
	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<Card>
				<CardHeader>
					<CardTitle className="text-center text-1xl">
						Login to your account
					</CardTitle>
					<CardDescription className="text-center">
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={FormAction}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>

								<Input
									id="email"
									type="email"
									name="email"
									placeholder="m@example.com"
									
								/>
							</div>
							<div className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input id="password" type="password" name="password"  />
							</div>
							<div className="flex flex-col gap-3"></div>
						</div>
						<SubmitButton></SubmitButton>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default FormSignIn;
