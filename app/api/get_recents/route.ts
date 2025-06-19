import { NextResponse } from 'next/server';
import {pgSqlDb} from "@/config/db/providers/client";
import { Template } from '@/types/templates';

// Disable caching for dynamic API responses
export const dynamic = 'force-dynamic';
export const revalidate = 0;


export async function GET() {
	try {
		// Fetch recent templates from the database
		const recentTemplates = (await pgSqlDb`
			SELECT 
				identifier, 
				template_category, 
				customer_email, 
				created_at 
			FROM templates 
			ORDER BY created_at DESC limit 7
   			`) as Template[]; // Explicitly cast the result to Template[]

		console.log('Fetched templates:', recentTemplates);

		// Return the templates as JSON with proper headers
		return new NextResponse(JSON.stringify(recentTemplates), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
				'Pragma': 'no-cache',
				'Expires': '0',
			},
		});
	} catch (error) {
		console.error('Error fetching recent templates:', error);

		// Return an error response with additional details
		return NextResponse.json(
			{ error: 'Failed to fetch recent templates', details: error },
			{
				status: 500,
				headers: {
					'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
					'Pragma': 'no-cache',
					'Expires': '0',
				},
			}
		);
	}
}
