import { CustomerData } from "@/types/templates";
import {pgSqlDb} from "@/config/db/providers/client";




export async function POST(req: Request) {

	try {

		const customerData: CustomerData = await req.json()
		console.log(customerData)

		await pgSqlDb`
				CREATE TABLE IF NOT EXISTS templates (
				identifier VARCHAR(255) PRIMARY KEY,
				template_category VARCHAR(50) CHECK (template_category IN ('invoice', 'receipt', 'customer')),
				customer_email VARCHAR(255),
				template_data JSONB NOT NULL,
				created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
				modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
			);	
		`;

		await pgSqlDb`
            INSERT INTO templates (identifier, template_category, customer_email,template_data)
            VALUES (${customerData.name}, 'customer', ${customerData.email}, ${customerData})
        `;

		// Return a success response
		return new Response(JSON.stringify({ message: "You saved a customer" }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});

	} catch (error) {

		// Narrow the error type using a type guard
		if (typeof error === 'object' && error !== null && 'code' in error) {
			const { code, constraint, detail, message } = error as { code: string; constraint?: string; detail?: string; message?: string };

			if (code === '23505') {
				if (constraint?.includes('email')) {
					return new Response(JSON.stringify({ error: 'A customer with this email already exists' }), { status: 409 });
				}
				if (constraint?.includes('name')) {
					return new Response(JSON.stringify({ error: 'All customers need to have unique names' }), { status: 409 });
				}
			}

			// Log full error object for debugging
			console.error('Full error object:', { code, constraint, detail, message });
			return new Response(JSON.stringify({ error: message || 'Database error' }), { status: 500 });
			
		} else {

			// Handle unexpected error types
			console.error('Unexpected error:', error);
			return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });

		}
	}

}