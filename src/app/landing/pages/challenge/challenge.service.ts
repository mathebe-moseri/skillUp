import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChallengePlayer, WeeklyChallengeMatch } from '../../../models/challenge.model';
import { ChallengeTask } from '../../../constants/challenge-tasks';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private matchSubject = new BehaviorSubject<WeeklyChallengeMatch | null>(null);
  match$ = this.matchSubject.asObservable();

  createMatch(
    player1: ChallengePlayer,
    player2: ChallengePlayer,
    task: ChallengeTask
  ) {
    const match: WeeklyChallengeMatch = {
      id: crypto.randomUUID(),
      status: 'waiting',
      players: [player1, player2],
      duration: task.durationSeconds,
      task
    };

    this.matchSubject.next(match);
  }

  setMatch(match: WeeklyChallengeMatch) {
    this.matchSubject.next(match);
  }

  getCurrentMatch() {
    return this.matchSubject.value;
  }
}