'use client';

import { ClockCounterClockwise, House } from "@phosphor-icons/react/dist/ssr";
import { SegmentedControl } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TemplateSegmentControl() {
	const router = useRouter()
	const [value, setValue] = useState('Home');

	const handleClick = (selectedValue: string) => {
		setValue(selectedValue);
		switch (selectedValue) {
			case 'Home':
				router.push('/create');
				break
			case 'Invoice':
				router.push('/create/invoice');
				break
			case 'Customers':
				router.push('/create/customers');
				break
			case 'Reciepts':
				router.push('/create/reciepts');
				break
			case 'Recents':
				router.push('/create/recents');
				break
		}
	}
	return (
		<div>
			<SegmentedControl.Root radius="full" value={value} onValueChange={handleClick}>
				<SegmentedControl.Item value="Home" >
					<House size={24} />
				</SegmentedControl.Item>
				<SegmentedControl.Item value="Invoice" >
					Invoice
				</SegmentedControl.Item>
				<SegmentedControl.Item value="Customers" >
					Customers
				</SegmentedControl.Item>
				<SegmentedControl.Item value="Reciepts" >
					Reciepts
				</SegmentedControl.Item>
				<SegmentedControl.Item value="Recents" >
					<ClockCounterClockwise size={24} />
				</SegmentedControl.Item>
			</SegmentedControl.Root>
		</div>
	);
}
