// Removed CategorySlugs import; caching per tournament ID now
export interface Odds {
    sportTournamentGroups: {
        name: string | null;
        events: {
            competition: string; // Serie A Betano
            homeTeam: string; // Flamengo RJ
            awayTeam: string; // Palmeiras SP
            odds: {
                home: number | null;
                draw: number | null;
                away: number | null;
            };
            date: string;
        }[];
    };
    cacheExpiresAt: Date | null;
} // uma lista de odds por torneio

export interface OddsStore {
    // key is tournament ID
    odds: Record<number, Odds>;
    loading: boolean;
    error: string | null;
    setCachedOdds: (tournamentId: number, odds: Odds) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getCachedOdds: (tournamentId: number) => Odds | undefined;
}