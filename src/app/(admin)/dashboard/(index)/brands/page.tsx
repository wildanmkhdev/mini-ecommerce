import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './columns'
import { getBrands } from './lib/data'

export default async function BrandsPage() {
  const brands = await getBrands()
  return (
    <div>
			<div className="flex justify-end my-5">
				<Button size="sm" className="w-[20%]" asChild>
					<Link  href="/dashboard/brands/create">
						<PlusIcon className="mr-2 h-4 w-4" />
						<span>Add Brand</span>
					</Link>
				</Button>
			</div>

			<div className="border shadow-sm rounded-lg">
				<DataTable columns={columns} data={brands}></DataTable>
			</div>
		</div>
  )
}
