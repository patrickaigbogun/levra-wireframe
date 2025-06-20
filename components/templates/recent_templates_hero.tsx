

'use client';

import { Flex, Heading, Link, Box, Callout } from "@radix-ui/themes";
import { useBaseUrl } from "@/constants/client/url";
import { ArrowSquareOutIcon, InfoIcon } from "@phosphor-icons/react";

export default function RecentTemplatesHero() {
	const baseUrl = useBaseUrl()

	return (
		<Flex direction="column" gap="8">

			<Flex direction="column" gap="6">
				<Heading size="8">Recently Created Templates</Heading>
				<Callout.Root variant="surface">
					<Callout.Icon>
						<InfoIcon size={24} />
					</Callout.Icon>
					<Callout.Text className="flex flex-row">
						Any template you create will show up here. Limited to the last 7 days. If you need anything past that, use the{" "}
						<Link href={`${baseUrl}/template/recents`} underline="hover">
							<span className="flex flex-row px-1">
								Recents<ArrowSquareOutIcon weight="duotone" size={20} />
							</span>
						</Link>
					</Callout.Text>
				</Callout.Root>
			</Flex>

			<Box>
				
			</Box>

		</Flex>
	);
}
