'use client';

import { Table } from "@radix-ui/themes";
import { RecentTemplatesTableProps } from "@/types/templates";



export default function RecentTemplatesTable({templates}: RecentTemplatesTableProps) {


	return (
		<section className="w-full min-w-full">
			<Table.Root
				variant="surface"
				layout="fixed"
				size="3"
			>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell >Template</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell >ID / Name</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell >Customer Email</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell >Timestamp</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{templates.map((template)=>(
						<Table.Row key={template.identifier}>
							<Table.RowHeaderCell>{template.template_category}</Table.RowHeaderCell>
							<Table.Cell>{template.identifier}</Table.Cell>
							<Table.Cell>{template.customer_email}</Table.Cell>
							<Table.Cell>{new Date(template.created_at).toLocaleString()}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</section>
	);
}