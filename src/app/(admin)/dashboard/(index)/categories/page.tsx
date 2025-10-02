import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DeleteIcon, PlusIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { columns } from "./column";
import { getCategories } from "./lib/data";
import Link from "next/link";

const CategoryPage = async () => {
	const data = await getCategories();
	return (
		<div>
			<Button size="sm" className="w-[30%] my-5" asChild>
				<Link href="/dashboard/categories/create">
					<PlusIcon></PlusIcon>
					<span>Add Category</span>
				</Link>
			</Button>
			<div className="border shadow-sm rounded-lg">
				<DataTable columns={columns} data={data}></DataTable>
			</div>
		</div>
	);
};

export default CategoryPage;
