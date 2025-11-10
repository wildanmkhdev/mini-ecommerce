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
import FormDelete from "./_components/form-delete";

export type TColumn = {
	id: number;
	name: string;
	image_url: string;
	category_name: string;
	brand_name: string;
	price: number;
	total_sales: number;
	stock: ProductStock;
	created_at: Date;
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
						src={
							getImageUrl(product.image_url, "products") ?? "/placeholder.png"
						}
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
		accessorKey: "created_At",
		header: "Created AT",
		cell: ({ row }) => {
			const product = row.original;
			return dateFormat(product.created_at);
		},
	},
	{
		id: "action",
		cell: ({ row }) => {
			const product = row.original;
			return (
				<div className="space-x-5 inline-flex">
					<Link href={`/dashboard/products/edit/${product.id}`}>
						<Button size="sm" variant="secondary">
							<Edit className="w-4 h-4 " /> Edit
						</Button>
					</Link>
					<FormDelete id={product.id}></FormDelete>
				</div>
			);
		},
	},
];
