
export interface InvoiceItem {
	id: number;
	name: string;
	description: string;
	quantity: string;
	rate: string;
	amount: number;
}

export   interface InvoiceEmailProps {
	invoiceNo: string;
	dueDate: string;
	billTo: string;
	shipTo: string;
	shipDate: string;
	shipVia: string;
	terms: string;
	items: InvoiceItem[];
	subtotal: number;
	shipping: number;
	total: number;
	message?: string;
  }