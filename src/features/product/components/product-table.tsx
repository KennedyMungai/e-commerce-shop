'use client'

import { columns } from './columns'
import { DataTable } from './data-table'

const ProductTable = () => {
	return <DataTable columns={columns} data={[]} />
}

export default ProductTable
