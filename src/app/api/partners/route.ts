import { NextResponse } from 'next/server';

import { transformPartners } from '@/services/api/next/partners/transformers';
import { getPartners } from '@/services/api/next/partners/getPartners';

// daria pra aplicar POO também com o uso de classes nos services
export async function GET() {
    const response = await getPartners();

    if (!response.data) {
        const { status, ...rest } = response;
        return NextResponse.json(rest, { status });
    }
    
   // transformar os dados antes de enviar ao frontend
   const transData  = transformPartners(response.data)

    return NextResponse.json(
        {
            message: response.message,
            data: transData,
            error: response.error
        },
        { status: response.status }
    );
}