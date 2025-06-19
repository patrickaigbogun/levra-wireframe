
import { CustomerData } from "@/types/templates";
import { baseUrl } from "@/constants/urls";
import { timeStamp } from "@/constants/date";
import { errResponse } from "@/constants/responses";
import { Response } from "@/types/response";

export async function getRecentCustomers(): Promise<Response<null> | Response<CustomerData[]>> {
	// Add timestamp to prevent caching

	const apiUrl = `${baseUrl}/api/get_recent_customers?t=${timeStamp}`;

	try {
		const result = await fetch(apiUrl, {
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				'Pragma': 'no-cache',
				'Expires': '0'
			}
		});

		if (!result.ok) {
			console.error(`HTTP error! status: ${result.status}`);
			return errResponse;
		}

		const data = await result.json() as CustomerData[];
		console.log(data)

		const response: Response<CustomerData[]> = {
			status: result.status,
			success: "ok",
			message: "your customers have been retrieved",
			data: data
		}

		return response;
	} catch (error) {
		console.error('Error fetching customers, Please check your API configuration: \n', error);
		return errResponse
	}
}