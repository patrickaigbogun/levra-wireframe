'use server';

import { Template } from "@/types/templates";
import { baseUrl } from "@/constants/urls";
import { timeStamp } from "@/constants/date";
import { Response } from "@/types/response";
import { errResponse } from "@/constants/responses";






export default async function getRecentTemplates(): Promise<Response<null> | Response<Template[]>> {
	// Add timestamp to prevent caching
	const apiUrl = `${baseUrl}/api/get_recents?t=${timeStamp}`;

	try {

		const result = await fetch(apiUrl, {
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				'Pragma': 'no-cache',
				'Ex	pires': '0'
			}
		});

		if (!result.ok) {
			console.error(`HTTP error! status: ${result.status}`);
			return errResponse;
		}

		const data = await result.json() as Template[];
		console.log(data)

		const response: Response<Template[]> = {
			status: result.status,
			success: "ok",
			message: "your templates have been retrieved",
			data: data
		}

		return response;
	} catch (error) {
		console.error('Error fetching templates, Please check your API configuration: \n', error);
		return errResponse
	}
}