import { EventListResponse } from "@/types/events/list";
import { Odds } from "@/types/odds";

export function transformEventList(eventListData: EventListResponse): Odds {
    const events = eventListData.data ?? [];
    if (!events.length) {
        return {
            sportTournamentGroups: {
                name: '',
                events: []
            },
            cacheExpiresAt: null
        }
    }
    return {
        sportTournamentGroups: {
            name: events[0].tournament.name,
            events: events.map((event) => ({
                competition: event.tournament.name,
                homeTeam: event.team_home.name,
                awayTeam: event.team_away.name,
                odds: {
                    home: event.main_outcome_0,
                    draw: !event.main_outcome_2 ? null : event.main_outcome_1,
                    away: !event.main_outcome_2 ? event.main_outcome_1 : event.main_outcome_2
                },
                date: new Date(event.start_at).toISOString(),
            }))
        },
        cacheExpiresAt: null
    }
}