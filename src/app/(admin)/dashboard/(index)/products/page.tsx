import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getBrands } from "../brands/lib/data";
import { columns } from "./columns";

export default function ProductPage() {
	return (
		<div>
			<div className="flex justify-end my-5">
				<Button size="sm" className="w-[20%]" asChild>
					<Link href="/dashboard/products/create">
						<PlusIcon className="mr-2 h-4 w-4" />
						<span>Add Product</span>
					</Link>
				</Button>
			</div>

			<div className="border shadow-sm rounded-lg">
				<DataTable columns={columns} data={[]}></DataTable>
			</div>
		</div>
	);
}
