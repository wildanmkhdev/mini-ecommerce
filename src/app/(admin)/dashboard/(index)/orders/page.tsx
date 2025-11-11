import React from "react";
import { getBrands } from "../brands/lib/data";
import { Button } from "@/components/ui/button";
import { Link, PlusIcon } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { columns } from "./column";

export default async function OrderPage() {
	const brands = await getBrands();
	return (
		<div>
		
			<div className="border shadow-sm rounded-lg">
				<DataTable columns={columns} data={[]}></DataTable>
			</div>
		</div>
	);
}
