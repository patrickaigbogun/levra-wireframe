import { InvoiceEmailProps } from "@/types/objects";
import {
	Body,
	Container,
	Column,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Row,
	Section,
	Text,
	Font,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";




export const InvoiceEmail = ({
	invoiceNo,
	dueDate,
	billTo,
	shipTo,
	shipDate,
	shipVia,
	terms,
	items,
	subtotal,
	shipping,
	total,
	message,
}: InvoiceEmailProps) => {
	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(amount);
	};

	return (
		<Html>
			<Head>
				<Font
					fontFamily="Inter"
					fallbackFontFamily="Arial"
					webFont={{
						url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap",
						format: "woff2",
					}}
				/>
			</Head>
			<Preview>Invoice {invoiceNo} - Due {formatDate(dueDate)}</Preview>
			<Tailwind>
				<Body className="bg-white font-sans">
					<Container className="mx-auto py-8 px-4">
						{/* Header */}
						<Section className="mb-8">
							<Row>
								<Column>
									<Heading className="text-2xl font-bold text-gray-800 mb-0">
										INVOICE
									</Heading>
									<Text className="text-gray-500 mt-1 mb-0">
										#{invoiceNo}
									</Text>
								</Column>
								<Column align="right">
									<Text className="text-gray-500 mt-1 mb-0">
										Due Date: {formatDate(dueDate)}
									</Text>
								</Column>
							</Row>
						</Section>

						<Hr className="border-gray-200 my-6" />

						{/* Billing and Shipping Info */}
						<Section>
							<Row>
								<Column>
									<Text className="font-bold mb-2">Bill To:</Text>
									<Text className="text-gray-600 whitespace-pre-line">
										{billTo}
									</Text>
								</Column>
								<Column>
									<Text className="font-bold mb-2">Ship To:</Text>
									<Text className="text-gray-600 whitespace-pre-line">
										{shipTo}
									</Text>
								</Column>
							</Row>
						</Section>

						{/* Shipping Details */}
						<Section className="mt-6">
							<Row>
								<Column>
									<Text className="text-sm text-gray-500">
										<span className="font-bold">Ship Date:</span> {formatDate(shipDate)}
									</Text>
								</Column>
								<Column>
									<Text className="text-sm text-gray-500">
										<span className="font-bold">Ship Via:</span> {shipVia}
									</Text>
								</Column>
								<Column>
									<Text className="text-sm text-gray-500">
										<span className="font-bold">Terms:</span> {terms}
									</Text>
								</Column>
							</Row>
						</Section>

						<Hr className="border-gray-200 my-6" />

						{/* Items Table */}
						<Section className="mt-6">
							<Row className="bg-gray-100 text-sm">
								<Column className="py-2 px-4 font-bold">Item</Column>
								<Column className="py-2 px-4 font-bold">Description</Column>
								<Column className="py-2 px-4 font-bold text-right">Quantity</Column>
								<Column className="py-2 px-4 font-bold text-right">Rate</Column>
								<Column className="py-2 px-4 font-bold text-right">Amount</Column>
							</Row>
							{items.map((item, index) => (
								<Row key={index} className="border-b border-gray-200">
									<Column className="py-2 px-4">{item.name}</Column>
									<Column className="py-2 px-4">{item.description}</Column>
									<Column className="py-2 px-4 text-right">{item.quantity}</Column>
									<Column className="py-2 px-4 text-right">
										{formatCurrency(Number(item.rate))}
									</Column>
									<Column className="py-2 px-4 text-right">
										{formatCurrency(item.amount)}
									</Column>
								</Row>
							))}
						</Section>

						{/* Totals */}
						<Section className="mt-6">
							<Row>
								<Column className="w-2/3" />
								<Column className="w-1/3">
									<Row>
										<Column>
											<Text className="text-gray-600">Subtotal:</Text>
										</Column>
										<Column align="right">
											<Text className="font-bold">{formatCurrency(subtotal)}</Text>
										</Column>
									</Row>
									<Row>
										<Column>
											<Text className="text-gray-600">Shipping:</Text>
										</Column>
										<Column align="right">
											<Text className="font-bold">{formatCurrency(shipping)}</Text>
										</Column>
									</Row>
									<Hr className="border-gray-200 my-2" />
									<Row>
										<Column>
											<Text className="font-bold">Total:</Text>
										</Column>
										<Column align="right">
											<Text className="font-bold">{formatCurrency(total)}</Text>
										</Column>
									</Row>
								</Column>
							</Row>
						</Section>

						{/* Message */}
						{message && (
							<Section className="mt-8">
								<Text className="text-gray-600 whitespace-pre-line">
									{message}
								</Text>
							</Section>
						)}

						{/* Footer */}
						<Section className="mt-8">
							<Text className="text-sm text-gray-500 text-center">
								Thank you for your business!
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default InvoiceEmail;