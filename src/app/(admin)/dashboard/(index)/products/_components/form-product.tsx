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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { AlertCircleIcon, ChevronLeft } from "lucide-react";

import Link from "next/link";
import React from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			variant="secondary"
			className="bg-blue-900"
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

export default function FormProduct({ brands = [], categories = [], locations = [] }: FormProductProps) {
	return (
		<div>
			<form action="">
				<div className="min-h-screen bg-neutral-950 text-white p-6">
					<div className="max-w-4xl mx-auto">
						{/* Header */}
						<div className="flex items-center justify-between mb-8">
							<div className="flex items-center gap-4">
								<Button className="p-2 transition-colors">
									<Link href="/dashboard/products">
										<ChevronLeft className="w-6 h-6" />
									</Link>
								</Button>
								<h1 className="text-2xl font-bold">Product</h1>
							</div>
							<SubmitButton />
						</div>

						{/* Product Details Card */}
						<Card className="bg-neutral-900 border-neutral-800">
							<CardHeader>
								<CardTitle className="text-2xl">Product Details</CardTitle>
								<CardDescription className="text-neutral-400">
									Isi informasi lengkap tentang produk yang akan ditambahkan.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* {state.error && (
									<Alert variant="destructive">
										<AlertCircleIcon />
										<AlertTitle>Peringatan !!!</AlertTitle>
										<AlertDescription className="capitalize">
											{state.error}
										</AlertDescription>
									</Alert>
								)} */}

								{/* Name Field */}
								<div className="space-y-2">
									<Label
										htmlFor="name"
										className="text-sm font-medium text-neutral-200">
										Nama Produk
									</Label>
									<Input
										id="name"
										name="name"
										placeholder="Masukkan nama produk"
										required
										className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2"
									/>
								</div>

								{/* Price Field */}
								<div className="space-y-2">
									<Label
										htmlFor="price"
										className="text-sm font-medium text-neutral-200">
										Harga
									</Label>
									<Input
										id="price"
										name="price"
										type="number"
										min="0"
										step="0.01"
										placeholder="0"
										required
										className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2"
									/>
								</div>

								{/* Stock Field */}
								<div className="space-y-2">
									<Label
										htmlFor="stock"
										className="text-sm font-medium text-neutral-200">
										Stok
									</Label>
									<Input
										id="stock"
										name="stock"
										type="number"
										min="0"
										placeholder="0"
										required
										className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2"
									/>
								</div>

								{/* Brand Field */}
								<div className="space-y-2">
									<Label
										htmlFor="brand"
										className="text-sm font-medium text-neutral-200">
										Brand
									</Label>
									<Select name="brand_id" required>
										<SelectTrigger className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2">
											<SelectValue placeholder="Pilih brand" />
										</SelectTrigger>
										<SelectContent className="bg-neutral-950 border-neutral-800">
											{brands.map((brand) => (
												<SelectItem key={brand.id} value={brand.id}>
													{brand.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* Category Field */}
								<div className="space-y-2">
									<Label
										htmlFor="category"
										className="text-sm font-medium text-neutral-200">
										Kategori
									</Label>
									<Select name="category_id" required>
										<SelectTrigger className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2">
											<SelectValue placeholder="Pilih kategori" />
										</SelectTrigger>
										<SelectContent className="bg-neutral-950 border-neutral-800">
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* Location Field */}
								<div className="space-y-2">
									<Label
										htmlFor="location"
										className="text-sm font-medium text-neutral-200">
										Lokasi
									</Label>
									<Select name="location_id" required>
										<SelectTrigger className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2">
											<SelectValue placeholder="Pilih lokasi" />
										</SelectTrigger>
										<SelectContent className="bg-neutral-950 border-neutral-800">
											{locations.map((location) => (
												<SelectItem key={location.id} value={location.id}>
													{location.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* Image Field */}
								<div className="space-y-2">
									<Label
										htmlFor="image"
										className="text-sm font-medium text-neutral-200">
										Gambar Produk
									</Label>
									<Input
										id="image"
										type="file"
										name="image"
										accept="image/*"
										className="bg-neutral-950 border-neutral-800 text-white focus:border-neutral-700 focus:ring-neutral-700 mt-2"
									/>
									<p className="text-xs text-neutral-500">
										Format: JPG, PNG, atau WEBP (Max 5MB)
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</form>
		</div>
	);
}