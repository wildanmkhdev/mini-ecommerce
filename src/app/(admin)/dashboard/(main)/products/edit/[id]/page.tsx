import { Tedit } from "@/types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getBrands } from "../../../brands/lib/data";
import { getCategories } from "../../../categories/lib/data";
import { getLocations } from "../../../locations/lib/data";
import { getProductById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormProduct from "../../_components/form-product";

export default async function EditPage({ params }: Tedit) {
	const product = await getProductById(Number.parseInt(params.id));
	const brands = await getBrands();
	const categories = await getCategories();
	const locations = await getLocations();
	if (!product) {
		return redirect("/dashboard/products");
	}
	return (
		<>
			<FormProduct type="EDIT" data={product}>
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
								<Select
									name="category_id"
									required
									defaultValue={product.category_id.toString()}>
									<SelectTrigger className="bg-[#0a0a0f] border-blue-600 text-white focus:border-blue-600 focus:ring-blue-600">
										<SelectValue placeholder="Select category" />
									</SelectTrigger>
									<SelectContent className="bg-[#111118] border-neutral-800">
										{categories?.map((category) => (
											<SelectItem
												key={category.id}
												value={`${category.id}`}
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
								<Select
									name="brand_id"
									required
									defaultValue={product.brand_id.toString()}>
									<SelectTrigger className="bg-[#0a0a0f] border-neutral-800 text-white focus:border-blue-600 focus:ring-blue-600">
										<SelectValue placeholder="Select brand" />
									</SelectTrigger>
									<SelectContent className="bg-[#111118] border-neutral-800">
										{brands?.map((brand) => (
											<SelectItem
												key={brand.id}
												value={`${brand.id}`}
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
								<Select
									name="location_id"
									required
									defaultValue={product.location_id.toString()}>
									<SelectTrigger className="bg-[#0a0a0f] border-neutral-800 text-white focus:border-blue-600 focus:ring-blue-600">
										<SelectValue placeholder="Select location" />
									</SelectTrigger>
									<SelectContent className="bg-[#111118] border-neutral-800">
										{locations?.map((location) => (
											<SelectItem
												key={location.id}
												value={`${location.id}`}
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
			</FormProduct>
		</>
	);
}
