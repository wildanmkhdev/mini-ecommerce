"use client";

import { Button } from "@/components/ui/button";
import { Location } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, TrashIcon } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Location>[] = [
	{
		accessorKey: "name", // ✅ perbaikan typo
		header: "Locations Name",
	},
	{
		id: "action",
		cell: ({ row }) => {
			const category = row.original;
			return (
				<div className="space-x-5 inline-flex">
					<Button size="sm" variant="secondary" asChild>
						<Link href={`/dashboard/locations/edit/${category.id}`}>
							<Edit className="w-4 h-4 " /> Edit
						</Link>
					</Button>
					<FormDelete id={category.id}></FormDelete>
				</div>
			);
		},
	},
];
