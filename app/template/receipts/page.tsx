'use client';

import { useState } from 'react';
import { Container, Heading, Text, Flex, Box, TextField, Button } from "@radix-ui/themes";
import { Receipt, Printer } from "@phosphor-icons/react";

export default function RecieptsPage() {
	const [receiptData, setReceiptData] = useState({
		businessName: '',
		address: '',
		phone: '',
		receiptNumber: '',
		date: '',
		items: [
			{ id: 1, name: '', quantity: 0, price: 0 },
		],
		subtotal: 40.00,
		tax: 4.00,
		total: 44.00,
	});

	const handleInputChange = (field: any, value: any) => {
		setReceiptData(prev => ({ ...prev, [field]: value }));
	};

	const handleItemChange = (id: number, field: string, value: string | number) => {
		const newItems = receiptData.items.map(item =>
			item.id === id ? { ...item, [field]: value } : item
		);

		const subtotal = newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
		const tax = subtotal * 0.1; // Assuming 10% tax
		const total = subtotal + tax;

		setReceiptData(prev => ({
			...prev,
			items: newItems,
			subtotal,
			tax,
			total,
		}));
	};

	const addItem = () => {
		const newItem = {
			id: Date.now(),
			name: `Item ${receiptData.items.length + 1}`,
			quantity: 1,
			price: 0,
		};
		setReceiptData(prev => ({
			...prev,
			items: [...prev.items, newItem],
		}));
	};

	const printReceipt = () => {
		window.print();
	};

	return (
		<Container size="2">
			<Box style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid var(--gray-6)', borderRadius: '8px' }}>
				<Flex direction="column" gap="4">
					<Flex align="center" justify="between">
						<Heading size="6">{receiptData.businessName}</Heading>
						<Receipt size={32} />
					</Flex>

					<Text size="2">{receiptData.address}</Text>
					<Text size="2">{receiptData.phone}</Text>

					<Flex justify="between">
						<Text size="2">Receipt #: {receiptData.receiptNumber}</Text>
						<Text size="2">Date: {receiptData.date}</Text>
					</Flex>

					<Box style={{ borderTop: '1px solid var(--gray-6)', borderBottom: '1px solid var(--gray-6)', padding: '10px 0' }}>
						{receiptData.items.map((item) => (
							<Flex key={item.id} justify="between" align="center" style={{ marginBottom: '10px' }}>
								<TextField.Root size="1" style={{ width: '40%' }}
									
										value={item.name}
										onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
									/>
								<TextField.Root size="1" style={{ width: '20%' }}
										type="number"
										value={item.quantity}
										onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
									/>
								<TextField.Root size="1" style={{ width: '30%' }}
										type="number"
										value={item.price.toFixed(2)}
										onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))}
									/>
							</Flex>
						))}
						<Button size="1" onClick={addItem}>Add Item</Button>
					</Box>

					<Flex direction="column" gap="2" style={{ alignItems: 'flex-end' }}>
						<Flex justify="between" style={{ width: '100%' }}>
							<Text size="2">Subtotal:</Text>
							<Text size="2">${receiptData.subtotal.toFixed(2)}</Text>
						</Flex>
						<Flex justify="between" style={{ width: '100%' }}>
							<Text size="2">Tax:</Text>
							<Text size="2">${receiptData.tax.toFixed(2)}</Text>
						</Flex>
						<Flex justify="between" style={{ width: '100%', borderTop: '1px solid var(--gray-6)', paddingTop: '10px' }}>
							<Text size="3" weight="bold">Total:</Text>
							<Text size="3" weight="bold">${receiptData.total.toFixed(2)}</Text>
						</Flex>
					</Flex>

					<Button onClick={printReceipt}>
						<Printer size={20}  />
						Print Receipt
					</Button>
				</Flex>
			</Box>
		</Container>
	);
}