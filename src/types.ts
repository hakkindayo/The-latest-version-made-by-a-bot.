export interface Challenge {
  id: string;
  name: string;
  description: string;
  xp: number;
  questType: string;
  storyContext?: string;
  chapter?: string;
  season?: string;
}

export interface ChallengeWithProgress extends Challenge {
  completed: boolean;
  completedAt?: string;
}

export interface ApiChallenge {
  id?: string;
  name: string;
  description: string;
  xp?: number;
  storyContext?: string;
}

export interface ApiResponse {
  challenges: ApiChallenge[];
  chapter?: string;
  season?: string;
  currentSeason?: {
    chapter: string;
    season: string;
  };
}