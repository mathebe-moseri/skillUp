// src/app/models/challenge.model.ts

export interface ChallengePlayer {
  id: string;
  realName: string;
  displayName: string;
  anonymous: boolean;
  avatar?: string;
  isReady: boolean;
  progress: number;
  completed: boolean;
  completionTime?: number; // seconds
}

export interface WeeklyChallengeMatch {
  id: string;
  status: 'setup' | 'waiting' | 'countdown' | 'live' | 'finished';
  players: [ChallengePlayer, ChallengePlayer]; // ✅ FIXED
  startedAt?: number;
  duration: number; // seconds
  winnerId?: string;
}