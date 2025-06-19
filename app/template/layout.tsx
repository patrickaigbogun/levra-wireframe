import type { Metadata } from "next";
import TemplateLayoutHeader from "@/components/templates/template_layout_header";


export const metadata: Metadata = {
	title: "Create your templates",
	description: "Created by Patrick Aigbogun",
};

export default function TemplateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className='w-full py-10'>
			<TemplateLayoutHeader />
			<section>
				{children}
			</section>

		</section>

	);
}
