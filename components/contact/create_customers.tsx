'use client';

import { CustomerData } from "@/types/templates";
import { FormEvent, useState, ChangeEvent } from "react";
import { TextField, Button, Flex, Text, Box } from "@radix-ui/themes";
import { Envelope, User, Phone } from "@phosphor-icons/react";
import { Bounce, toast } from "react-toastify";

export default function CreateCustomers() {
	// const [status, setStatus] = useState<string | null>(null);
	const [customerData, setCustomerData] = useState<CustomerData>({
		name: '',
		email: '',
		phoneNo: ''
	});




	const handleInputChange = (field: keyof CustomerData) => (e: ChangeEvent<HTMLInputElement>): void => {
		setCustomerData(prev => ({
			...prev,
			[field]: e.target.value
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/create_customer', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(customerData)
			});
			if (response.ok) {
				// setStatus('Success! You saved a customer.');
				toast.success('Success! You saved a customer.', {
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
				toast.error('Customer was not saved!', {
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
				// setStatus('Customer was not saved!');
			}
		} catch (error) {
			console.error('Oops! Try that again', error);
			toast.error('🦄 Wow so easy!', {
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
			// setStatus('Oops! Try that again');
		}
	};

	return (
		<Box className="w-full max-w-md mx-auto my-10 p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white">
			<form onSubmit={handleSubmit} className="space-y-6">
				<Flex direction="column" gap="2">
					<Text as="label" htmlFor="email" size="2" weight="bold">
						Customer&apos;s Email
					</Text>
					<TextField.Root id="email"
						type="email"
						value={customerData.email}
						placeholder="customer@gmail.com"
						onChange={handleInputChange('email')}
						required
					>
						<TextField.Slot>
							<Envelope size={20} />
						</TextField.Slot>
					</TextField.Root>
				</Flex>
				<Flex direction="column" gap="2">
					<Text as="label" htmlFor="name" size="2" weight="bold">
						Customer&apos;s Name
					</Text>
					<TextField.Root
						id="name"
						type="text"
						value={customerData.name}
						placeholder="Customer INC"
						onChange={handleInputChange('name')}
						required
					>
						<TextField.Slot>
							<User size={20} />
						</TextField.Slot>



					</TextField.Root>
				</Flex>
				<Flex direction="column" gap="2">
					<Text as="label" htmlFor="tel" size="2" weight="bold">
						Customer&apos;s Phone
					</Text>
					<TextField.Root
						id="tel"
						type="tel"
						value={customerData.phoneNo}
						placeholder="09090909"
						onChange={handleInputChange('phoneNo')}
						required
					>
						<TextField.Slot>
							<Phone size={20} />
						</TextField.Slot>

					</TextField.Root>
				</Flex>
				<Button type="submit" className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition-colors">
					Save this Customer
				</Button>
			</form>

		</Box>
	);
}