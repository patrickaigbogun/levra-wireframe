import type { Metadata } from "next";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import "./globals.css";
import Header from "@/components/ui/dashboard/header";
import ToastProvider from "@/components/providers/toast_provider";


export const metadata: Metadata = {
	title: "Lightweight CRM",
	description: "Created by Patrick Aigbogun",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={` antialiased text-white p-0 m-0 font-bold `}
			>
				<ThemeProvider attribute="class">

					<Theme accentColor="gray" grayColor="olive" radius="full" >
						<ToastProvider>
							<section className="mx-auto w-[95%] sm:w-[75%">
								<Header />
								{children}
							</section>
						</ToastProvider>
					</Theme>
				</ThemeProvider >

			</body>
		</html>
	);
}
