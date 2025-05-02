export interface Team {
  id: string;
  name: string;
  logo?: string;
  color?: string;
  shortName?: string;
  country?: string;
  city?: string;
}

export interface Player {
  id: string;
  name: string;
  number?: number;
  position?: string;
  image?: string;
  team?: Team;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  date: string; // ISO date string
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED';
  competition?: Competition;
  stadium?: string;
  referee?: string;
  minute?: number;
}

export interface Competition {
  id: string;
  name: string;
  logo?: string;
  country?: string;
  color?: string;
}

export interface MatchStat {
  type: string;
  home: number;
  away: number;
}

export interface PlayerStat {
  player: Player;
  goals?: number;
  assists?: number;
  shots?: number;
  shotsOnTarget?: number;
  passes?: number;
  passesCompleted?: number;
  tackles?: number;
  saves?: number;
  rating?: number;
}

export interface TeamStat {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface RadarChartData {
  label: string;
  value: number;
  maxValue: number;
}

export type PerformanceStats = {
  shots: number;
  passes: number;
  crosses: number;
  corners: number;
  saves: number;
  outs: number;
  // Add additional fields that might be used in the comparison card
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physical?: number;
  duels?: number;
  fouls?: number;
  rating?: number;
};

export type PlayerPerformance = {
  player: Player;
  stats: PerformanceStats;
};

export interface TeamPerformance {
  team: Team;
  stats: PerformanceStats;
}

export interface HeadToHead {
  team1: Team;
  team2: Team;
  team1Wins: number;
  team2Wins: number;
  draws: number;
  lastMatches: Match[];
  team1GoalsPerMatch: number;
  team2GoalsPerMatch: number;
  team1BestScore: string;
  team2BestScore: string;
}
