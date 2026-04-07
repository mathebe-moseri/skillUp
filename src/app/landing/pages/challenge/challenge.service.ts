// src/app/shared/services/challenge.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChallengePlayer, WeeklyChallengeMatch } from '../../../models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private matchSubject = new BehaviorSubject<WeeklyChallengeMatch | null>(null);
  match$ = this.matchSubject.asObservable();

  createMatch(player1: ChallengePlayer, player2: ChallengePlayer) {
    const match: WeeklyChallengeMatch = {
      id: crypto.randomUUID(),
      status: 'waiting',
      players: [player1, player2], // ✅ always 2 players
      duration: 300 // 5 mins
    };

    this.matchSubject.next(match);
  }

  updatePlayerReady(playerId: string, isReady: boolean) {
    const match = this.matchSubject.value;
    if (!match) return;

    const updatedPlayers: [ChallengePlayer, ChallengePlayer] =
      match.players.map(player =>
        player.id === playerId ? { ...player, isReady } : player
      ) as [ChallengePlayer, ChallengePlayer];

    const bothReady = updatedPlayers.every(player => player.isReady);

    this.matchSubject.next({
      ...match,
      players: updatedPlayers,
      status: bothReady ? 'countdown' : 'waiting'
    });
  }

  startMatch() {
    const match = this.matchSubject.value;
    if (!match) return;

    this.matchSubject.next({
      ...match,
      status: 'live',
      startedAt: Date.now()
    });
  }

  updateProgress(playerId: string, progress: number) {
    const match = this.matchSubject.value;
    if (!match) return;

    const updatedPlayers: [ChallengePlayer, ChallengePlayer] =
      match.players.map(player =>
        player.id === playerId ? { ...player, progress } : player
      ) as [ChallengePlayer, ChallengePlayer];

    this.matchSubject.next({
      ...match,
      players: updatedPlayers
    });
  }

completePlayer(playerId: string, completionTime: number) {
  const match = this.matchSubject.value;
  if (!match) return;

  const updatedPlayers = match.players.map(player =>
    player.id === playerId
      ? { ...player, completed: true, completionTime, progress: 100 }
      : player
  ) as [ChallengePlayer, ChallengePlayer];

  const finishedPlayers = updatedPlayers.filter(p => p.completed);

  let winnerId: string | undefined = undefined;
  let status = match.status;

  if (finishedPlayers.length === 2) {
    const sorted = [...finishedPlayers].sort(
      (a, b) => (a.completionTime ?? Infinity) - (b.completionTime ?? Infinity)
    );

    winnerId = sorted[0].id;
    status = 'finished';
  }

  this.matchSubject.next({
    ...match,
    players: updatedPlayers,
    status,
    winnerId
  });
}

  getCurrentMatch() {
    return this.matchSubject.value;
  }
}