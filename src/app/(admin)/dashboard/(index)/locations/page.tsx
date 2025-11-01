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
import { getLocations } from "./lib/data";
import Link from "next/link";

const CategoryPage = async () => {
	const data = await getLocations();
	return (
		<div>
			<div className="flex justify-end my-5">
				<Button size="sm" className="w-[20%]" asChild>
					<Link href="/dashboard/locations/create">
						<PlusIcon className="mr-2 h-4 w-4" />
						<span>Add Locations</span>
					</Link>
				</Button>
			</div>

			<div className="border shadow-sm rounded-lg">
				<DataTable columns={columns} data={data}></DataTable>
			</div>
		</div>
	);
};

export default CategoryPage;
