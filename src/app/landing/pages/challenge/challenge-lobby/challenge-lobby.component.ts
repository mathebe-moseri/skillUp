import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { WeeklyChallengeMatch } from '../../../../models/challenge.model';
import { ChallengeService } from '../challenge.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-challenge-lobby',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './challenge-lobby.component.html',
  styleUrl: './challenge-lobby.component.css'
})
export class ChallengeLobbyComponent implements OnInit, OnDestroy{

   match: WeeklyChallengeMatch | null = null;
  countdown = 3;
  private sub?: Subscription;
  private countdownSub?: Subscription;

  constructor(
    private challengeService: ChallengeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.challengeService.match$.subscribe(match => {
      this.match = match;

      if (match?.status === 'countdown' && !this.countdownSub) {
        this.startCountdown();
      }
    });
  }

  markReady(playerId: string) {
    this.challengeService.updatePlayerReady(playerId, true);
  }

  startCountdown() {
    this.countdown = 3;

    this.countdownSub = interval(1000).subscribe(() => {
      this.countdown--;

      if (this.countdown === 0) {
        this.challengeService.startMatch();
        this.countdownSub?.unsubscribe();
        this.router.navigate(['/challenge/live']);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.countdownSub?.unsubscribe();
  }

}
