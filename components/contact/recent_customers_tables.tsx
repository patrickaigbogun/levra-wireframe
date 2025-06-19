'use client';

import { Table } from '@radix-ui/themes';

import { RecentCustomersTableProps } from "@/types/templates";

export default function RecentCustomersTable({ customers }: RecentCustomersTableProps) {
	return (
		<section className="space-y-6">

			{/* Results Count */}
			<p className="text-sm">
				Showing {customers.length} of {customers.length} customers
			</p>
			
			{/* Customer Table */}

			<Table.Root variant="surface" layout={'fixed'} size={'3'}>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>
							S/N
						</Table.ColumnHeaderCell>

						{['name', 'email', 'phoneNo'].map((column) => (
							<Table.ColumnHeaderCell key={column}>
								{column}
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>

				<Table.Body>

					{customers.map((customer, index) => (
						<Table.Row key={customer.email}>
							<Table.Cell >{index + 1}</Table.Cell>
							<Table.Cell >{customer.name}</Table.Cell>
							<Table.Cell >{customer.email}</Table.Cell>
							<Table.Cell >{customer.phoneNo}</Table.Cell>
						</Table.Row>
					))
					}
				</Table.Body>
			</Table.Root>
		</section>
	);
}