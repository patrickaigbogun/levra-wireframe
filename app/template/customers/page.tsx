import dynamic from "next/dynamic";
import CreateCustomers from "@/components/contact/create_customers";
import { getRecentCustomers } from "@/lib/contacts/getCustomer";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { UserPlus, Users } from "@phosphor-icons/react/dist/ssr";
import { safeFetch } from "@/utils/safe-fetch";

const ListCustomers = dynamic(
	() => import("@/components/contact/recent_customers_tables"),
	{ ssr: false }
);
export default async function CustomerPage() {
	const { data, error } = await safeFetch(getRecentCustomers, {
		filter: true,
		coerce: true,
	});

	const customers = data || [];

	if (error) {
		console.error("Error fetching customers:", error);
		return (
			<Box>
				<Text size="2" color="red">
					Failed to load customers. Please try again later.
				</Text>
			</Box>
		);
	}
	return (
		<Box>
			<Flex direction="column" gap="8">
				<Box>
					<Flex align="center" gap="2">
						<UserPlus size={32} />
						<Heading size="6">Add Your Customers</Heading>
					</Flex>
					<Text size="2" color="gray">
						Add your customers here to see them on the list below
					</Text>
					<CreateCustomers />
				</Box>

				<Box>
					<Flex align="center" gap="2">
						<Users size={32} />
						<Heading size="6">Saved Customers</Heading>
					</Flex>
					<Text size="2" color="gray">
						Saved customers can be set as recipients of invoices,
						receipts, notices, etc.
					</Text>
					<ListCustomers customers={customers} />
				</Box>
			</Flex>
		</Box>
	);
}
