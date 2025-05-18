export interface EventListResponse {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    data: Event[] | [];
  }
  
  export interface Event {
    id: number;
    sport: Sport;
    category: Category;
    tournament: Tournament;
    season: Season;
    team_home: Team;
    team_away: Team;
    status: string;
    status_details: string | null;
    start_at: Date ; // ISO 8601 datetime
    winner: string | null;
    score_home: number | null;
    score_away: number | null;
    score_details: string | null;
    comments: string;
    final_result_only: boolean;
    main_outcome_0: number | null;
    main_outcome_1: number | null;
    main_outcome_2: number | null;
    main_volume_1: number | null;
    main_volume_2: number | null;
  }
  
  export interface Sport {
    id: number;
    name: string;
    slug: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
    code: string | null;
  }
  
  export interface Tournament {
    id: number;
    name: string;
    slug: string;
  }
  
  export interface Season {
    id: number;
    slug: string;
    year_start: number;
    year_end: number | null;
  }
  
  export interface Team {
    id: number;
    name: string;
    slug: string;
    team_type: string;
  }
  