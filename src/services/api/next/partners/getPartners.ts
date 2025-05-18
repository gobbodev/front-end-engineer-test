import { PartnersResponse, PartnersTransformed } from "@/types/partners";
import { ServiceResponse } from "@/types/services";

const partners: PartnersResponse = [
    { id: 1, name: '7k bet', logo: 'https://anagaming.com.br/0104%20-%20ANAGAMINGBR_arquivos/7k.webp', url: 'https://7k.bet.br/' },
    { id: 2, name: 'Cassino', logo: 'https://anagaming.com.br/0104%20-%20ANAGAMINGBR_arquivos/6dd3abad2ea87914cadb17-Camada1-2048x392.webp', url: 'https://cassino.bet.br/' },
    { id: 3, name: 'Vera bet', logo: 'https://anagaming.com.br/0104%20-%20ANAGAMINGBR_arquivos/vera@3x-2048x508.webp', url: 'https://vera.bet.br/' },
];

export const getPartners = async (): Promise<ServiceResponse<PartnersResponse>> => {
    try {

        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            status: 200,
            message: 'Partners retrieved successfully',
            data: partners,
            error: null
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Failed to retrieve partners',
            data: null,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};