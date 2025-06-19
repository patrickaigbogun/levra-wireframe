import { InvoiceItem } from "./objects";

export interface CustomerData {
	name: string;
	email: string;
	phoneNo: string;
}

export type Customers ={
	customers: CustomerData[];
}

export type RecentCustomersTableProps = {
	customers: CustomerData[];
}


export interface InvoiceData {
	invoiceNo: string;
	email: CustomerData['email'];
	dueDate: string;
	message: string;
	billTo: string;
	shipTo: string;
	shipDate: string;
	shipVia: string;
	terms: string;
	items: InvoiceItem[];
	subtotal: number;
	shipping: number;
	total: number;
}

export type Template = {
	identifier: string;
	template_category: string;
	customer_email: string;
	created_at: Date;
}

export type Templates = {
	templates: Template[];
}

export type RecentTemplatesTableProps={
	templates: Template[];
}

