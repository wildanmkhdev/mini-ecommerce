"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase";
import { dateFormat, rupiahformat } from "@/lib/utils";
import { ProductStock } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Edit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type TColumn = {
	id: number;
	name: string;
	image_url: string;
	category_name: string;
	brand_name: string;
	price: number;
	total_sales: number;
	stock: ProductStock;
	createdAt: Date;
};
export const columns: ColumnDef<TColumn>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			const product = row.original;
			return (
				<div className="inline-flex items-center gap-5">
					<Image
						src={getImageUrl(product.image_url) ?? "/placeholder.png"}
						alt=""
						width={80}
						height={80}
						className="rounded-md object-cover"
					/>

					<span>{product.name}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			const product = row.original;
			return rupiahformat(product.price);
		},
	},
	{
		accessorKey: "stock",
		header: "Status",
		cell: ({ row }) => {
			const product = row.original;
			return <Badge variant={"outline"}>{product.stock}</Badge>;
		},
	},
	{
		accessorKey: "total_sales",
		header: "Total sales",
	},
	{
		accessorKey: "createdAt",
		header: "Created AT",
		cell: ({ row }) => {
			const product = row.original;
			return dateFormat(product.createdAt);
		},
	},
	{
		id: "action",
		cell: ({ row }) => {
			const brand = row.original;
			return (
				<div className="space-x-5 inline-flex">
					<Button size="sm" variant="secondary" asChild>
						<Link href={`/dashboard/brands/edit/${brand.id}`}>
							<Edit className="w-4 h-4 " /> Edit
						</Link>
					</Button>
					{/* <FormDelete id={brand.id}></FormDelete> */}
				</div>
			);
		},
	},
];
