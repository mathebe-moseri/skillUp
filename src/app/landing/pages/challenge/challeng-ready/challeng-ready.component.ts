import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ChallengeService } from '../challenge.service';
import { WeeklyChallengeMatch } from '../../../../models/challenge.model';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../../../shared/socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-challeng-ready',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challeng-ready.component.html',
  styleUrl: './challeng-ready.component.css'
})
export class ChallengReadyComponent implements OnInit, OnDestroy {
  match: WeeklyChallengeMatch | null = null;
  elapsedSeconds = 0;

  private sub?: Subscription;
  private timerSub?: Subscription;
  private eventsSub?: Subscription;
  private joinSub?: Subscription;
  private updateCodeSub?: Subscription;
  private runCodeSub?: Subscription;
  private submitCodeSub?: Subscription;
  private activeFileSub?: Subscription;

  constructor(
    private challengeService: ChallengeService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.sub = this.challengeService.match$.subscribe((match: WeeklyChallengeMatch | null) => {
      this.match = match;
    });

    const matchId = localStorage.getItem('matchId');
    const userId = localStorage.getItem('userId');

    if (matchId) {
      this.eventsSub = this.socketService
        .connectToMatchEvents(matchId)
        .subscribe({
          next: ({ event, data }) => {
            if (event === 'match_updated') {
              this.challengeService.setMatch(data as WeeklyChallengeMatch);
            }

            if (event === 'match_started') {
              this.challengeService.setMatch(data as WeeklyChallengeMatch);
              this.elapsedSeconds = 0;
            }

            if (event === 'match_finished') {
              const payload = data as { reason?: string; match: WeeklyChallengeMatch };
              this.challengeService.setMatch(payload.match);
            }
          },
          error: (error) => {
            console.error('Match events error:', error);
          }
        });
    }

    if (matchId && userId) {
      this.joinSub?.unsubscribe();
      this.joinSub = this.socketService.joinMatch(matchId, userId).subscribe({
        next: ({ match }) => {
          this.challengeService.setMatch(match);
        },
        error: (error) => {
          console.error('Join match failed:', error);
        }
      });
    }

    this.timerSub = interval(1000).subscribe(() => {
      if (this.match?.status === 'live') {
        this.elapsedSeconds++;
      }
    });
  }

  get currentUserId(): string {
    return localStorage.getItem('userId') ?? '';
  }

  get me() {
    if (!this.match || !this.currentUserId) return null;
    return this.match.players.find(player => player.id === this.currentUserId) ?? null;
  }

  get opponent() {
    if (!this.match || !this.currentUserId) return null;
    return this.match.players.find(player => player.id !== this.currentUserId) ?? null;
  }

  get myFileNames(): string[] {
    return this.me?.files ? Object.keys(this.me.files) : [];
  }

  get activeFileName(): string {
    return this.me?.activeFile ?? '';
  }

  get activeFileContent(): string {
    if (!this.me?.files || !this.me.activeFile) return '';
    return this.me.files[this.me.activeFile] ?? '';
  }

  selectFile(fileName: string): void {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    if (!matchId || !userId) return;

    this.activeFileSub?.unsubscribe();
    this.activeFileSub = this.socketService
      .setActiveFile(matchId, userId, fileName)
      .subscribe({
        error: (error) => {
          console.error('Set active file failed:', error);
        }
      });
  }

  updateCode(content: string): void {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    const fileName = this.me?.activeFile;

    if (!matchId || !userId || !fileName) return;

    this.updateCodeSub?.unsubscribe();
    this.updateCodeSub = this.socketService
      .updateCode(matchId, userId, fileName, content)
      .subscribe({
        next: ({ match }) => {
          this.challengeService.setMatch(match);
        },
        error: (error) => {
          console.error('Update code failed:', error);
        }
      });
  }

  runCode(): void {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    if (!matchId || !userId) return;

    this.runCodeSub?.unsubscribe();
    this.runCodeSub = this.socketService
      .runCode(matchId, userId)
      .subscribe({
        next: ({ match }) => {
          this.challengeService.setMatch(match);
        },
        error: (error) => {
          console.error('Run code failed:', error);
        }
      });
  }

  submitCode(): void {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    if (!matchId || !userId) return;

    this.submitCodeSub?.unsubscribe();
    this.submitCodeSub = this.socketService
      .submitCode(matchId, userId, this.elapsedSeconds)
      .subscribe({
        next: ({ match }) => {
          this.challengeService.setMatch(match);
        },
        error: (error) => {
          console.error('Submit code failed:', error);
        }
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.timerSub?.unsubscribe();
    this.eventsSub?.unsubscribe();
    this.joinSub?.unsubscribe();
    this.updateCodeSub?.unsubscribe();
    this.runCodeSub?.unsubscribe();
    this.submitCodeSub?.unsubscribe();
    this.activeFileSub?.unsubscribe();
  }
}