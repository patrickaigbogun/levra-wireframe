import { NextResponse } from 'next/server';
import {pgSqlDb} from "@/config/db/providers/client";
import { CustomerData } from '@/types/templates';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    
    try {

        const recentCustomers = (await pgSqlDb`
            SELECT template_data
            FROM templates
            WHERE template_category = 'customer'
            ORDER BY created_at DESC
            LIMIT 7
        `) as { template_data: CustomerData }[];

        // Extract the JSON objects into a plain array
        const customers = recentCustomers.map((row) => row.template_data);
        console.log(customers)

        return new NextResponse(JSON.stringify(customers), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch customers' }, 
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