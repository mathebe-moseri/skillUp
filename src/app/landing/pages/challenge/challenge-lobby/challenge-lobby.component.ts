import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { WeeklyChallengeMatch } from '../../../../models/challenge.model';
import { ChallengeService } from '../challenge.service';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../../../shared/socket.service';

@Component({
  selector: 'app-challenge-lobby',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge-lobby.component.html',
  styleUrl: './challenge-lobby.component.css'
})
export class ChallengeLobbyComponent implements OnInit, OnDestroy {
  match: WeeklyChallengeMatch | null = null;
  countdown = 3;
  currentUserId = localStorage.getItem('userId') ?? '';

  private sub?: Subscription;
  private matchUpdatedSub?: Subscription;
  private countdownStartedSub?: Subscription;
  private matchStartedSub?: Subscription;
  private countdownSub?: Subscription;

  constructor(
    private challengeService: ChallengeService,
    private router: Router,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.sub = this.challengeService.match$.subscribe(match => {
      this.match = match;
    });

    this.matchUpdatedSub = this.socketService
      .on<WeeklyChallengeMatch>('match_updated')
      .subscribe((match) => {
        this.challengeService.setMatch(match);
      });

    this.countdownStartedSub = this.socketService
      .on<{ seconds: number; match: WeeklyChallengeMatch }>('countdown_started')
      .subscribe(({ seconds, match }) => {
        this.countdown = seconds;
        this.challengeService.setMatch(match);
        this.startCountdown();
      });

    this.matchStartedSub = this.socketService
      .on<WeeklyChallengeMatch>('match_started')
      .subscribe((match) => {
        this.challengeService.setMatch(match);
        this.router.navigate(['/challenge/live']);
      });

    const matchId = localStorage.getItem('matchId');
    if (matchId) {
      this.socketService.emit('join_match', { matchId });
    }
  }

  get myPlayer() {
    if (!this.match || !this.currentUserId) return null;
    return this.match.players.find(player => player.id === this.currentUserId) ?? null;
  }

  markReady() {
    const matchId = localStorage.getItem('matchId');
    if (!matchId || !this.currentUserId) return;

    this.socketService.emit('player_ready', {
      matchId,
      userId: this.currentUserId
    });
  }

  startCountdown() {
    this.countdownSub?.unsubscribe();
    this.countdownSub = interval(1000).subscribe(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        this.countdownSub?.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.matchUpdatedSub?.unsubscribe();
    this.countdownStartedSub?.unsubscribe();
    this.matchStartedSub?.unsubscribe();
    this.countdownSub?.unsubscribe();
  }
}