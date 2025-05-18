import { EventListResponse } from "@/types/events/list";
import { ServiceResponse } from "@/types/services";
import { transformEventList } from "./transformers";
import { Odds } from "@/types/odds";

export async function getOdds(tournamentId: number): Promise<ServiceResponse<Odds>> {

    try {
        const days: Date = new Date();
        days.setDate(days.getDate() + 7); // 7 dias a partir de hoje

        const url = `https://odds-feed.p.rapidapi.com/api/v1/events?tournament_id=${tournamentId}&status=SCHEDULED&start_at_max=${days.toISOString()}&page=0`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '75f878e7a6msh23693ca38cbad84p1cd2d5jsn2fa5bab94a55',
                'x-rapidapi-host': 'odds-feed.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }
        const eventListData = result as EventListResponse;

        const odds = transformEventList(eventListData);

        return {
            status: 200,
            message: 'Odds retrieved successfully',
            data: odds,
            error: null
        };
    }
    catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Failed to retrieve odds',
            data: null,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }

}
