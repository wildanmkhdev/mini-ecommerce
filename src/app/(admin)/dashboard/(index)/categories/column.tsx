"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, TrashIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: "name", // ✅ perbaikan typo
		header: "Category Name",
	},
	{
		id: "action",
		cell: ({ row }) => {
			const category = row.original;
			return (
				<div className="space-x-5">
					<Button size="sm" variant="secondary" asChild>
						<Link href={`/dashboard/categories/edit/${category.id}`}>
							<Edit className="w-4 h-4 " />
						</Link>
					</Button>
					<Button variant="destructive" size="sm">
						<TrashIcon className="w-4 h-4" />
					</Button>
				</div>
			);
		},
	},
];
