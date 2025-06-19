"use client";

import { useState } from "react";
import { Article, CashRegister, ClockCounterClockwise, DotsThreeCircle } from "@phosphor-icons/react";
import Logo from "../../header_logo";
import { Button, Flex } from "@radix-ui/themes";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { House } from "@phosphor-icons/react/dist/ssr";
import { baseUrl } from "@/constants/urls";

export default function Drawer() {
	const [isOpen, setIsOpen] = useState(false);

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
				<DotsThreeCircle size={32} />
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
						<DotsThreeCircle size={32} />
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
									<House size={24} />Home
								</Button>
							</NavigationMenu.Link>
						</NavigationMenu.Item>
						<NavigationMenu.Item>
							<NavigationMenu.Link
								href={`${baseUrl}/template`}
								className="block px-4 py-2"
							>
								<Button color="gray" variant="ghost" highContrast radius='full' size={'3'}>
								<Article size={24} />Template
								</Button>
							</NavigationMenu.Link>
						</NavigationMenu.Item>
						<NavigationMenu.Item>
							<NavigationMenu.Link
								href={`${baseUrl}/transactions`}
								className="block px-4 py-2 "
							>
								<Button color="gray" variant="ghost" highContrast radius='full' size={'3'}>
								<CashRegister size={24} />Transactions
								</Button>
							</NavigationMenu.Link>
						</NavigationMenu.Item>
						<NavigationMenu.Item>
							<NavigationMenu.Link
								href={`${baseUrl}/history`}
								className="block px-4 py-2 "
							>
								<Button color="gray" variant="ghost" highContrast radius='full' size={'3'}>
								<ClockCounterClockwise size={24} />History
								</Button>
							</NavigationMenu.Link>
						</NavigationMenu.Item>
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</div>
		</div>
	);
}
