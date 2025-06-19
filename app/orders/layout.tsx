import type { Metadata } from "next";


export const metadata: Metadata = {
	title: "Transactions happen to show up here",
	description: "Created by Patrick Aigbogun",
};


export default function TransactionsLayout({
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
  )
}
