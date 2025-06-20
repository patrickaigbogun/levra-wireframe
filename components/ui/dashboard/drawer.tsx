"use client";

import { useState } from "react";
import { ArticleIcon, CashRegisterIcon, ClockCounterClockwiseIcon, DotsThreeCircleIcon } from "@phosphor-icons/react";
import Logo from "../../header_logo";
import { Button, Flex } from "@radix-ui/themes";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { HouseIcon } from "@phosphor-icons/react";
import { useBaseUrl } from "@/constants/client/url";

export default function Drawer() {
	const [isOpen, setIsOpen] = useState(false);

	const baseUrl = useBaseUrl();
	console.log(baseUrl)


	const toggleDrawer = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative z-10">
			{/* Button to open the drawer */}
			<button
				className={`transition-all ${isOpen ? "invisible" : "visible"}`}
				onClick={toggleDrawer}
				aria-label="Open menu"
			>
				<DotsThreeCircleIcon size={32} />
			</button>

			{/* Drawer */}
			<div
				className={`fixed top-0 left-0 h-full w-[50%] md:w-[23%] bg-black bg-opacity-40 backdrop-blur-lg shadow-lg p-2 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
					}`}
			>
				<Flex direction="row" justify="between" align="center" className="mb-4">
					<Logo />
					<button
						onClick={toggleDrawer}
						aria-label="Close menu"
						className="p-2 text-white"
					>
						<DotsThreeCircleIcon size={32} />
					</button>
				</Flex>

				{/* NavigationMenu for Nav */}
				<NavigationMenu.Root className="flex flex-col gap-2">
					<NavigationMenu.List>
						<NavigationMenu.Item>
							<NavigationMenu.Link
								href={`${baseUrl}`}
								className="block px-4 py-2  "
							>
								<Button color="gray" variant="ghost" highContrast radius='full' size={'3'}>
									<HouseIcon size={24} />Home
								</Button>
							</NavigationMenu.Link>
						</NavigationMenu.Item>
						<NavigationMenu.Item>
							<NavigationMenu.Link
								href={`${baseUrl}/template`}
								className="block px-4 py-2"
							>
								<Button color="gray" variant="ghost" highContrast radius='full' size={'3'}>
								<ArticleIcon size={24} />Template
								</Button>
							</NavigationMenu.Link>
						</NavigationMenu.Item>
						<NavigationMenu.Item>
							<NavigationMenu.Link
								href={`${baseUrl}/transactions`}
								className="block px-4 py-2 "
							>
								<Button color="gray" variant="ghost" highContrast radius='full' size={'3'}>
								<CashRegisterIcon size={24} />Transactions
								</Button>
							</NavigationMenu.Link>
						</NavigationMenu.Item>
						<NavigationMenu.Item>
							<NavigationMenu.Link
								href={`${baseUrl}/history`}
								className="block px-4 py-2 "
							>
								<Button color="gray" variant="ghost" highContrast radius='full' size={'3'}>
								<ClockCounterClockwiseIcon size={24} />History
								</Button>
							</NavigationMenu.Link>
						</NavigationMenu.Item>
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</div>
		</div>
	);
}
