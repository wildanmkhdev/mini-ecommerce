"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useActionState, useState } from "react";

import { AlertCircleIcon, ChevronLeft, Link } from "lucide-react";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import postBrand from "../lib/action";
import { ActionResult } from "@/types";
const initialState: ActionResult = {
	error: "",
};
function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			variant="secondary"
			className="bg-blue-900"
			type="submit"
			disabled={pending}>
			{pending ? "Loading..." : "Save Brand"}
		</Button>
	);
}
export default function FormBrand() {
	const [state, formAction] = useActionState(postBrand, initialState);
	return (
		<div>
			<form action={formAction}>
				<div className="min-h-screen bg-neutral-950 text-white p-6">
					<div className="max-w-4xl mx-auto">
						{/* Header */}
						<div className="flex items-center justify-between mb-8">
							<div className="flex items-center gap-4">
								<Button className="p-2 transition-colors">
									<Link href="/dashboard/categories">
										<ChevronLeft className="w-6 h-6" />
									</Link>
								</Button>
								<h1 className="text-2xl font-bold">Brand</h1>
							</div>
							<SubmitButton></SubmitButton>
						</div>

						{/* Product Details Card */}
						<Card className="bg-neutral-900 border-neutral-800">
							<CardHeader>
								<CardTitle className="text-2xl">Brands Details</CardTitle>
								<CardDescription className="text-neutral-400">
									Lipsum dolor sit amet, consectetur adipiscing elit
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{state.error != "" && (
									<Alert variant="destructive">
										<AlertCircleIcon />
										<AlertTitle>Peringatan !!!</AlertTitle>
										<AlertDescription className="capitalize">
											{state.error}
										</AlertDescription>
									</Alert>
								)}
								{/* Name Field */}
								<div className="space-y-2">
									<Label
										htmlFor="name"
										className="text-sm font-medium text-neutral-200 ">
										Name
									</Label>
									<Input
										id="name"
										name="name"
										className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2"
									/>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="logo"
										className="text-sm font-medium text-neutral-200 ">
										Logo
									</Label>
									<Input
										id="logo"
										type="file"
										name="image"
										className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2"
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</form>
		</div>
	);
}
