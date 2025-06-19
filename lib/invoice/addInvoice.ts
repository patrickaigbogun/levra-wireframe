'use server';

import { InvoiceData } from "@/types/templates";
import { baseUrl } from "@/constants/urls";
import { cookies } from 'next/headers';



export async function AddInvoice(invoiceData: InvoiceData) {

	try {

		// Forward to API route
		const apiResponse = await fetch(`${baseUrl}/api/add_invoice`, {

			method: 'POST',
			body: JSON.stringify(invoiceData)

		});

		const result = await apiResponse.json();
		// Relay API response back to client


		// Set a cookie to pass status back to client
		if (result.success) {

			cookies().set('invoiceStatus', 'success', {
				maxAge: 60,
				path: '/'

			});

		} else {

			cookies().set('invoiceStatus', 'failed', {
				maxAge: 60,
				path: '/'

			});

		}

		return {

			success: result.success,
			message: result.message

		};

	} catch (error) {

		cookies().set('invoiceStatus', 'failed', {

			maxAge: 60,
			path: '/'

		});

		return {

			success: false,
			message: `Invoice could not be processed: ${error}`

		};

	}
	
}