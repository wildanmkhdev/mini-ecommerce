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
import React from "react";
import { useFormStatus } from "react-dom";
import UploadImages from "./upload-images";

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

interface FormProductProps {
	brands?: Array<{ id: string; name: string }>;
	categories?: Array<{ id: string; name: string }>;
	locations?: Array<{ id: string; name: string }>;
}

export default function FormProduct({
	brands = [],
	categories = [],
	locations = [],
}: FormProductProps) {
	return (
		<div className="min-h-screen bg-[#0a0a0f] text-white p-6">
			<form action="">
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
										Lipsum dolor sit amet, consectetur adipiscing elit
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-5">
									{/* Name Field */}
									<div className="space-y-2">
										<Label htmlFor="name" className="text-sm font-medium">
											Name
										</Label>
										<Input
											id="name"
											name="name"
											placeholder=""
											required
											className="bg-[#0a0a0f] border-neutral-800 text-white focus:border-blue-600 focus:ring-blue-600"
										/>
									</div>

									{/* Description Field */}
									<div className="space-y-2">
										<Label
											htmlFor="description"
											className="text-sm font-medium">
											Description
										</Label>
										<Textarea
											id="description"
											name="description"
											placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
											rows={5}
											className="bg-[#0a0a0f] border-neutral-800 text-white focus:border-blue-600 focus:ring-blue-600 resize-none"
										/>
									</div>
								</CardContent>
							</Card>

							{/* Product Category Card */}
							<Card className="bg-[#111118] border-neutral-800">
								<CardHeader>
									<CardTitle className="text-xl font-semibold">
										Product Category
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										{/* Category Field */}
										<div className="space-y-2">
											<Label htmlFor="category" className="text-sm font-medium">
												Category
											</Label>
											<Select name="category_id" required>
												<SelectTrigger className="bg-[#0a0a0f] border-blue-600 text-white focus:border-blue-600 focus:ring-blue-600">
													<SelectValue placeholder="Select category" />
												</SelectTrigger>
												<SelectContent className="bg-[#111118] border-neutral-800">
													{categories.map((category) => (
														<SelectItem
															key={category.id}
															value={category.id}
															className="text-white focus:bg-neutral-800">
															{category.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										{/* Brand Field */}
										<div className="space-y-2">
											<Label htmlFor="brand" className="text-sm font-medium">
												Brand
											</Label>
											<Select name="brand_id" required>
												<SelectTrigger className="bg-[#0a0a0f] border-neutral-800 text-white focus:border-blue-600 focus:ring-blue-600">
													<SelectValue placeholder="Select brand" />
												</SelectTrigger>
												<SelectContent className="bg-[#111118] border-neutral-800">
													{brands.map((brand) => (
														<SelectItem
															key={brand.id}
															value={brand.id}
															className="text-white focus:bg-neutral-800">
															{brand.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										{/* Location Field */}
										<div className="space-y-2">
											<Label htmlFor="location" className="text-sm font-medium">
												Location
											</Label>
											<Select name="location_id" required>
												<SelectTrigger className="bg-[#0a0a0f] border-neutral-800 text-white focus:border-blue-600 focus:ring-blue-600">
													<SelectValue placeholder="Select location" />
												</SelectTrigger>
												<SelectContent className="bg-[#111118] border-neutral-800">
													{locations.map((location) => (
														<SelectItem
															key={location.id}
															value={location.id}
															className="text-white focus:bg-neutral-800">
															{location.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Right Column - Status & Images */}
						<div className="space-y-6">
							{/* Product Status Card */}
							<Card className="bg-[#111118] border-neutral-800">
								<CardHeader>
									<CardTitle className="text-xl font-semibold">
										Product Status
									</CardTitle>
									<CardDescription className="text-neutral-400 text-sm">
										Lipsum dolor sit amet, consectetur adipiscing elit
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									{/* Status Field */}
									<div className="space-y-2">
										<Label htmlFor="status" className="text-sm font-medium">
											Status
										</Label>
										<Select name="status" required>
											<SelectTrigger className="bg-[#0a0a0f] border-neutral-800 text-white focus:border-blue-600 focus:ring-blue-600">
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent className="bg-[#111118] border-neutral-800">
												<SelectItem
													value="active"
													className="text-white focus:bg-neutral-800">
													Active
												</SelectItem>
												<SelectItem
													value="draft"
													className="text-white focus:bg-neutral-800">
													Draft
												</SelectItem>
												<SelectItem
													value="archived"
													className="text-white focus:bg-neutral-800">
													Archived
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</CardContent>
							</Card>

							{/* Product Images Card */}
							<UploadImages></UploadImages>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
