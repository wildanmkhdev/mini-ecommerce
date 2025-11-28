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
import { useActionState } from "react";
import { AlertCircleIcon, ChevronLeft, Link } from "lucide-react";
import { useFormStatus } from "react-dom";
import postBrand, {
	updateBrandWithId as updateBrandAction,
} from "../lib/action"; // ✅ perhatikan ini!
import { ActionResult } from "@/types";
import { Brand } from "@prisma/client";

const initialState: ActionResult = { error: "" };

interface FormBrandProps {
	type?: "ADD" | "EDIT";
	data?: Brand | null;
}

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

export default function FormBrand({ data, type }: FormBrandProps) {
	// ✅ Ganti nama fungsi lokal agar tidak bentrok
	const handleUpdateBrand = async (_: unknown, formData: FormData) => {
		return await updateBrandAction(_, formData, data?.id ?? 0);
	};

	// ✅ Pilih fungsi berdasarkan mode (ADD / EDIT)
	const [state, formAction] = useActionState(
		type === "ADD" ? postBrand : handleUpdateBrand,
		initialState
	);

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
							<SubmitButton />
						</div>

						{/* Brand Details Card */}
						<Card className="bg-neutral-900 border-neutral-800">
							<CardHeader>
								<CardTitle className="text-2xl">Brand Details</CardTitle>
								<CardDescription className="text-neutral-400">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{state.error && (
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
										defaultValue={data?.name}
										className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2"
									/>
								</div>

								{/* Logo Field */}
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
