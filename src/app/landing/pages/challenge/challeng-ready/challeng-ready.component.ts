import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ChallengeService } from '../challenge.service';
import { WeeklyChallengeMatch } from '../../../../models/challenge.model';
import { CommonModule } from '@angular/common';
// import { ChallengeService } from 'src/app/shared/services/challenge.service';
// import { WeeklyChallengeMatch } from 'src/app/models/challenge.model';

@Component({
  selector: 'app-challeng-ready',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challeng-ready.component.html',
  styleUrl: './challeng-ready.component.css'
})
export class ChallengReadyComponent implements OnInit, OnDestroy{
match: WeeklyChallengeMatch | null = null;
  elapsedSeconds = 0;
  private sub?: Subscription;
  private timerSub?: Subscription;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.sub = this.challengeService.match$.subscribe(match => {
      this.match = match;
    });

    this.timerSub = interval(1000).subscribe(() => {
      if (this.match?.status === 'live') {
        this.elapsedSeconds++;
      }
    });
  }

  updateMyProgress(progress: number) {
    const myId = this.match?.players[0].id;
    if (!myId) return;

    this.challengeService.updateProgress(myId, progress);
  }

  completeChallenge() {
    const myId = this.match?.players[0].id;
    if (!myId) return;

    this.challengeService.completePlayer(myId, this.elapsedSeconds);
  }

  simulateOpponentProgress(progress: number) {
    const opponentId = this.match?.players[1]?.id;
    if (!opponentId) return;

    this.challengeService.updateProgress(opponentId, progress);
  }

  simulateOpponentFinish() {
    const opponentId = this.match?.players[1]?.id;
    if (!opponentId) return;

    this.challengeService.completePlayer(opponentId, this.elapsedSeconds + 8);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.timerSub?.unsubscribe();
  }
}
