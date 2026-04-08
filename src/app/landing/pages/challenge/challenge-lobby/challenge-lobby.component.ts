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
  private eventsSub?: Subscription;
  private joinSub?: Subscription;
  private readySub?: Subscription;
  private countdownSub?: Subscription;

  constructor(
    private challengeService: ChallengeService,
    private router: Router,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.sub = this.challengeService.match$.subscribe((match: WeeklyChallengeMatch | null) => {
      this.match = match;
    });

    const matchId = localStorage.getItem('matchId');

    if (matchId) {
      this.eventsSub = this.socketService
        .connectToMatchEvents(matchId)
        .subscribe({
          next: ({ event, data }) => {
            if (event === 'match_updated') {
              this.challengeService.setMatch(data as WeeklyChallengeMatch);
            }

            if (event === 'countdown_started') {
              const payload = data as { seconds: number; match: WeeklyChallengeMatch };
              this.countdown = payload.seconds;
              this.challengeService.setMatch(payload.match);
              this.startCountdown();
            }

            if (event === 'match_started') {
              this.challengeService.setMatch(data as WeeklyChallengeMatch);
              this.router.navigate(['/challenge/live']);
            }
          },
          error: (error) => {
            console.error('Match events error:', error);
          }
        });
    }

    if (matchId && this.currentUserId) {
      this.joinSub = this.socketService
        .joinMatch(matchId, this.currentUserId)
        .subscribe({
          next: ({ match }) => {
            this.challengeService.setMatch(match);
          },
          error: (error) => {
            console.error('Join match failed:', error);
          }
        });
    }
  }

  get myPlayer() {
    if (!this.match || !this.currentUserId) return null;
    return this.match.players.find(player => player.id === this.currentUserId) ?? null;
  }

  markReady(): void {
    const matchId = localStorage.getItem('matchId');
    if (!matchId || !this.currentUserId) return;

    this.readySub?.unsubscribe();
    this.readySub = this.socketService
      .playerReady(matchId, this.currentUserId)
      .subscribe({
        next: ({ match }) => {
          this.challengeService.setMatch(match);
        },
        error: (error) => {
          console.error('Player ready failed:', error);
        }
      });
  }

  startCountdown(): void {
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
    this.eventsSub?.unsubscribe();
    this.joinSub?.unsubscribe();
    this.readySub?.unsubscribe();
    this.countdownSub?.unsubscribe();
  }
}