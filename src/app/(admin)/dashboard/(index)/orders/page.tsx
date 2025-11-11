import React from "react";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./column";
import { getOrdes } from "./lib/data";

export default async function OrderPage() {
	const orders = await getOrdes();
	return (
		<div>
			<div className="border shadow-sm rounded-lg">
				<DataTable columns={columns} data={orders}></DataTable>
			</div>
		</div>
	);
}
