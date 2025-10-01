"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash, TrashIcon } from "lucide-react";

export const columns: ColumnDef<Category>[] = [
	{
		accesorKey: "name",
		header: "Category Name",
	},
	{
		id: "action",
		cell: ({ row }) => {
			const category = row.original;
			return (
				<div className="space-x-4">
					<Button size="sm">
						<Edit className="md-4 h-4">edit</Edit>
					</Button>
					<Button variant="destructive" size="sm">
						<TrashIcon className="md-4 h-4">Delete</TrashIcon>
					</Button>
				</div>
			);
		},
	},
];
