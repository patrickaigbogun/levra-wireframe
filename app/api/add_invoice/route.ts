
import InvoiceEmail from '@/components/invoice/invoice_template';
import { InvoiceData } from '@/types/templates';
import {pgSqlDb} from "@/config/db/providers/client";
import { NextRequest, NextResponse } from 'next/server';
import { emailConfig } from '@/config/email/providers/client';




export async function POST(req: NextRequest) {
	try {
		const formData: InvoiceData = await req.json()
		console.log(formData)


		const { data, error } = await emailConfig.emails.send({
			from: 'main@patrickaigbogun.me',
			to: [formData.email],
			subject: `Invoice #${formData.invoiceNo}`,
			react: InvoiceEmail(formData),
		});
		console.log(data)

		if (error) {
			return NextResponse.json({
				success: false,
				message: 'Failed to send email',
				error
			}, { status: 500 });
		}

		// Save to database
		try {
			const result = await saveInvoiceToDatabase(formData);
			if (!result) {
				return NextResponse.json({
					success: false,
					message: 'Failed to save invoice to database'
				}, { status: 500 });
			}

		} catch (error) {
			console.error('Database save error:', error);
			return NextResponse.json({
				success: false,
				message: 'Email sent but failed to save invoice',
				error
			}, { status: 500 });
		}


		return NextResponse.json({
			success: true,
			message: 'Invoice was added and email sent successfully!'
		});


	} catch (error) {
		console.error('Invoice processing error:', error);
		return NextResponse.json({
			success: false,
			message: 'Failed to process invoice',
			error
		}, { status: 500 });
	}
}

async function saveInvoiceToDatabase(formData: InvoiceData) {
	const templateData = formData;

	try {
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

		const result = await pgSqlDb`
            INSERT INTO templates (identifier, template_category, customer_email, template_data)
            VALUES (${templateData.invoiceNo}, 'invoice', ${templateData.email}, ${templateData} )
			RETURNING *;  

        `;

		// Validate that a row was actually inserted
		if (result.length === 0) {
			throw new Error('No rows were inserted');
		}

		return true;  // Explicitly return success
	} catch (error) {
		console.error('Database save error:', error);
		throw error;  // Rethrow to allow caller to handle
	}
}
