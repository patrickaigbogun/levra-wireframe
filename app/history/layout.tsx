


import type { Metadata } from "next";


export const metadata: Metadata = {
	title: "History of all activites show up here",
	description: "Created by Patrick Aigbogun",
};

export default function HistoryLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className='w-full'>
			<section>
				{children}
			</section>

		</section>

	);
}
