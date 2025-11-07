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
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircleIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { ReactNode, useActionState } from "react";
import { useFormStatus } from "react-dom";
import UploadImages from "./upload-images";
import { ActionResult } from "@/types";
import { storeProduct } from "../lib/action";

interface FormProductProps {
	children?: ReactNode;
}

const initialState: ActionResult = {
	error: "",
};

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			className="bg-blue-600 hover:bg-blue-700"
			type="submit"
			disabled={pending}>
			{pending ? "Loading..." : "Save Product"}
		</Button>
	);
}

export default function FormProduct({ children }: FormProductProps) {
	const [state, formAction] = useActionState(storeProduct, initialState);

	return (
		<div className="min-h-screen bg-[#0a0a0f] text-white p-6">
			<form action={formAction} encType="multipart/form-data">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								className="p-2 hover:bg-neutral-800"
								type="button">
								<Link href="/dashboard/products">
									<ChevronLeft className="w-6 h-6" />
								</Link>
							</Button>
							<h1 className="text-2xl font-bold">Add Product</h1>
						</div>
						<div className="flex gap-3">
							<Button
								variant="outline"
								className="border-neutral-700 text-white hover:bg-neutral-800"
								type="button">
								Discard
							</Button>
							<SubmitButton />
						</div>
					</div>

					{/* Two Column Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Left Column - Product Details & Category */}
						<div className="lg:col-span-2 space-y-6">
							{/* Product Details Card */}
							<Card className="bg-[#111118] border-neutral-800">
								<CardHeader>
									<CardTitle className="text-xl font-semibold">
										Product Details
									</CardTitle>
									<CardDescription className="text-neutral-400 text-sm">
										Enter product information correctly.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-5">
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
										<Label htmlFor="name">Name</Label>
										<Input
											id="name"
											name="name"
											required
											className="bg-[#0a0a0f] border-neutral-800 text-white"
										/>
									</div>

									{/* Price Field */}
									<div className="space-y-2">
										<Label htmlFor="price">Price</Label>
										<Input
											id="price"
											name="price"
											type="number"
											required
											className="bg-[#0a0a0f] border-neutral-800 text-white"
										/>
									</div>

									{/* Description Field */}
									<div className="space-y-2">
										<Label htmlFor="description">Description</Label>
										<Textarea
											id="description"
											name="description"
											rows={4}
											className="bg-[#0a0a0f] border-neutral-800 text-white resize-none"
										/>
									</div>
								</CardContent>
							</Card>

							{/* Product Category Card */}
							{children}
						</div>

						{/* Right Column - Status & Images */}
						<div className="space-y-6">
							{/* Product Status */}
							<Card className="bg-[#111118] border-neutral-800">
								<CardHeader>
									<CardTitle>Product Status</CardTitle>
									<CardDescription className="text-neutral-400 text-sm">
										Set the stock status
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="stock">Status</Label>
										<Select name="stock" required>
											<SelectTrigger className="bg-[#0a0a0f] border-neutral-800 text-white">
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent className="bg-[#111118] border-neutral-800">
												<SelectItem value="ready">Ready</SelectItem>
												<SelectItem value="preorder">Preorder</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</CardContent>
							</Card>

							{/* Product Images */}
							<UploadImages />
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
