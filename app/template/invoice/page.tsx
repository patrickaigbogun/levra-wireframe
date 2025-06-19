'use client';

import { InvoiceItem } from '@/types/objects';
import { FormEvent, useEffect, useState } from 'react';
import { getRecentCustomers } from '@/lib/contacts/getCustomer';
import { AddInvoice } from '@/lib/invoice/addInvoice';
import { InvoiceData, CustomerData } from '@/types/templates';
import { Bounce, toast } from 'react-toastify';
import { PlusCircle } from '@phosphor-icons/react';
import { Box, Flex, Select, Text, Heading, TextField, TextArea, Container, Button, Table } from '@radix-ui/themes';
import { safeFetch } from '@/utils/safe-fetch';





const InvoicePage: React.FC = () => {
	const [customerEmails, setCustomerEmails] = useState<string[]>([]);
	const [invoiceData, setInvoiceData] = useState<InvoiceData>({
		invoiceNo: '',
		email: '',
		dueDate: '',
		message: '',
		billTo: '',
		shipTo: '',
		shipDate: '',
		shipVia: '',
		terms: '',
		items: [
			{
				id: 1,
				name: '',
				description: '',
				quantity: '',
				rate: '',
				amount: 0
			}
		],
		subtotal: 0,
		shipping: 0,
		total: 0
	});

	const handleItemChange = (index: number, field: keyof InvoiceItem, value: string): void => {
		const newItems = [...invoiceData.items];
		newItems[index] = { ...newItems[index], [field]: value };

		// Calculate amount if quantity and rate are present
		if (field === 'quantity' || field === 'rate') {
			const quantity = field === 'quantity' ? value : newItems[index].quantity;
			const rate = field === 'rate' ? value : newItems[index].rate;
			if (quantity && rate) {
				newItems[index].amount = Number(quantity) * Number(rate);
			}
		}

		// Calculate subtotal and total
		const subtotal = newItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

		setInvoiceData(prev => ({
			...prev,
			items: newItems,
			subtotal,
			total: subtotal + Number(prev.shipping)
		}));
	};

	const addNewItem = (): void => {
		setInvoiceData(prev => ({
			...prev,
			items: [...prev.items, {
				id: prev.items.length + 1,
				name: '',
				description: '',
				quantity: '',
				rate: '',
				amount: 0
			}]
		}));
	};

	const handleInputChange = (field: keyof InvoiceData, value: string): void => {
		setInvoiceData(prev => ({
			...prev,
			[field]: value
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await AddInvoice(invoiceData)

			if (response.success) {
				// setStatus(response.message);
				toast.success(response.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
					transition: Bounce,
				});
			} else {
				// setStatus(response.message);
				toast.error(response.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
					transition: Bounce,
				})
			}
		} catch (error) {
			console.error('Submit error:', error);
			toast.error(`An error occurred: ${error}`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Bounce,
			})
			// setStatus(`${error}: An error occurred.`);
		}
	};

	const fetchCustomerEmails = async () => {
		try {
			const {data, error} = await safeFetch(getRecentCustomers,{
				 coerce: true,
				filter: true
			});
			const customers =  data || [];
			if (error){
				toast.warning("we're unable to fetch customers at this time")
			}
			const emails = customers.map(customer => customer.email);
			setCustomerEmails(emails);
		} catch (error) {
			console.error("Error fetching customer emails:", error);
			toast.warning(<div><h1>There's been an issue on our end!</h1><br/><small>we cant fetch your customers at the moment</small></div>, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Bounce,
			})
		}
	};

	useEffect(() => {
		fetchCustomerEmails();
	}, []);

	return (
		<Container >
			<form onSubmit={handleSubmit}>
				<Box >
					<Flex direction="column" gap="6">
						{/* Header Section */}
						<Flex direction={'row'} justify="between" align="center">
							<Box>
								<Box >
									<Text >Your Logo</Text>
								</Box>
								<Heading size="6">INVOICE</Heading>
							</Box>
							<Box>
								<Select.Root size={'3'} defaultValue="Select Customer Email" onValueChange={(value: string) => handleInputChange('email', value)}>
									<Select.Trigger variant='classic' radius='large' >
									</Select.Trigger>
									<Select.Content>
										{customerEmails.map((email, index) => (
											<Select.Item key={index} value={email}>
												{email}
											</Select.Item>
										))}
									</Select.Content>
								</Select.Root>
							</Box>
							<Flex direction="column" gap="2">
								<TextField.Root
									radius={'large'}
									variant='classic'
									placeholder="Invoice No"
									value={invoiceData.invoiceNo}
									onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
								/>
								<TextField.Root
									radius={'large'}
									variant='classic'
									type="date"
									value={invoiceData.dueDate}
									onChange={(e) => handleInputChange('dueDate', e.target.value)}
								/>
							</Flex>
						</Flex>

						{/* Message Section */}
						<TextArea
							radius={'large'}
							variant='classic'
							placeholder="Enter your message here..."
							value={invoiceData.message}
							onChange={(e) => handleInputChange('message', e.target.value)}
						/>

						{/* Billing Details */}
						<Flex gap="4">
							<Box >
								<Heading size="3">Bill To:</Heading>
								<TextArea
									variant='classic'
									value={invoiceData.billTo}
									onChange={(e) => handleInputChange('billTo', e.target.value)}
								/>
							</Box>
							<Box>
								<Heading size="3">Ship To:</Heading>
								<TextArea
									variant='classic'
									value={invoiceData.shipTo}
									onChange={(e) => handleInputChange('shipTo', e.target.value)}
								/>
							</Box>
						</Flex>

						{/* Shipping Details */}
						<Flex gap="4">
							<TextField.Root
								variant='classic'
								type="date"
								placeholder="Ship Date"
								value={invoiceData.shipDate}
								onChange={(e) => handleInputChange('shipDate', e.target.value)}
							/>
							<TextField.Root
								variant='classic'
								placeholder="Ship Via"
								value={invoiceData.shipVia}
								onChange={(e) => handleInputChange('shipVia', e.target.value)}
							/>
							<TextField.Root
								variant='classic'
								placeholder="Terms"
								value={invoiceData.terms}
								onChange={(e) => handleInputChange('terms', e.target.value)}
							/>
						</Flex>

						{/* Order Details Table */}
						<Box>
							<Table.Root variant='ghost' layout={'fixed'} >
								<Table.Header>
									<Table.Row >
										<Table.ColumnHeaderCell >Item</Table.ColumnHeaderCell>
										<Table.ColumnHeaderCell >Description</Table.ColumnHeaderCell>
										<Table.ColumnHeaderCell >Quantity</Table.ColumnHeaderCell>
										<Table.ColumnHeaderCell >Rate</Table.ColumnHeaderCell>
										<Table.ColumnHeaderCell >Amount</Table.ColumnHeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{invoiceData.items.map((item, index) => (
										<Table.Row key={item.id} >
											<Table.Cell>
												<TextField.Root
													variant='classic'
													value={item.name}
													onChange={(e) => handleItemChange(index, 'name', e.target.value)}
												/>
											</Table.Cell>
											<Table.Cell>
												<TextField.Root
													variant='classic'
													value={item.description}
													onChange={(e) => handleItemChange(index, 'description', e.target.value)}
												/>
											</Table.Cell>
											<Table.Cell>
												<TextField.Root
													variant='classic'
													type="number"
													value={item.quantity}
													onChange={(e) => handleItemChange(index, 'quantity', (e.target.value))}
												/>
											</Table.Cell>
											<Table.Cell>
												<TextField.Root
													variant='classic'
													type="number"
													value={item.rate}
													onChange={(e) => handleItemChange(index, 'rate', (e.target.value))}
												/>
											</Table.Cell>
											<Table.Cell>
												<TextField.Root
													type="number"
													value={item.amount}
													readOnly
													variant='soft'
												/>
											</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table.Root>
							<Button onClick={addNewItem} variant='classic' >
								<PlusCircle />
								Add Item
							</Button>
						</Box>

						{/* Totals Section */}
						<Flex justify="end">
							<Box>
								<Flex justify="between" align="center">
									<Text weight="medium">Subtotal:</Text>
									<TextField.Root
										type="number"
										value={invoiceData.subtotal}
										readOnly
										variant='soft'
									/>
								</Flex>
								<Flex justify="between" align="center" >
									<Text weight="medium">Shipping:</Text>
									<TextField.Root
										type="number"
										value={invoiceData.shipping}
										onChange={(e) => setInvoiceData(prev => ({
											...prev,
											shipping: Number(e.target.value),
											total: prev.subtotal + Number(e.target.value)
										}))}

									/>
								</Flex>
								<Flex justify="between" align="center">
									<Text weight="bold">Total:</Text>
									<TextField.Root
										type="number"
										value={invoiceData.total}
										readOnly
										variant='soft'
									/>
								</Flex>
							</Box>
						</Flex>

						<Button type="submit" variant='classic' >
							Send this invoice
						</Button>
					</Flex>
				</Box>
			</form>
		</Container>

	);
};

export default InvoicePage;