export interface TournamentIdsGroup {
    name: string; // Ex: "Principais", "Recentes", "Outros"
    tournaments: {
        id: number;
        name: string;
    }[];
}

export interface CategoryTournamentGroups {
    [categorySlug: string]: TournamentIdsGroup[];
}
