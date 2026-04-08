import { ChallengeTask } from '../constants/challenge-tasks';

export interface ChallengePlayer {
  id: string;
  realName: string;
  displayName: string;
  anonymous: boolean;
  avatar: string;

  isReady: boolean;
  progress: number;
  completed: boolean;
  score: number;

  files?: Record<string, string>;
  activeFile?: string;

  completionTime?: number;
}


export interface WeeklyChallengeMatch {
  id: string;

  status: 'setup' | 'waiting' | 'countdown' | 'live' | 'finished';

  players: [ChallengePlayer, ChallengePlayer];

  duration: number;
  task: ChallengeTask;

  startedAt?: number;
  winnerId?: string;
}