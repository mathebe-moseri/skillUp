import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChallengeService } from '../challenge.service';
import { DEMO_USERS } from '../../../../constants/users';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CHALLENGE_TASKS } from '../../../../constants/challenge-tasks';
import { SocketService } from '../../../../shared/socket.service';
import { Subscription } from 'rxjs';
import { WeeklyChallengeMatch } from '../../../../models/challenge.model';

@Component({
  selector: 'app-challenge-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenge-setup.component.html',
  styleUrl: './challenge-setup.component.css'
})
export class ChallengeSetupComponent implements OnDestroy {
  users = DEMO_USERS;
  tasks = CHALLENGE_TASKS;

  mode: 'create' | 'join' = 'create';

  selectedUserId = 'u2';
  selectedTaskId = this.tasks[0].id;
  useAnonymous = false;

  joinMatchId = '';
  joiningAsUserId = 'u2';

  private createdSub?: Subscription;
  private joinedSub?: Subscription;
  private eventsSub?: Subscription;

  constructor(
    private challengeService: ChallengeService,
    private router: Router,
    private socketService: SocketService
  ) {}

  startSetup(): void {
    const currentUser = this.users[0];
    const opponent = this.users.find(user => user.id === this.selectedUserId);
    if (!opponent) return;

    const selectedTask = this.tasks.find(task => task.id === this.selectedTaskId);
    if (!selectedTask) return;

    const starterFiles = { ...selectedTask.starterFiles };
    const opponentFiles = { ...selectedTask.starterFiles };
    const firstFile = Object.keys(selectedTask.starterFiles)[0] ?? '';

    const player1 = {
      id: currentUser.id,
      realName: currentUser.realName,
      displayName: this.useAnonymous ? 'CodeFox' : currentUser.realName,
      anonymous: this.useAnonymous,
      avatar: currentUser.avatar,
      isReady: false,
      progress: 0,
      completed: false,
      score: 0,
      files: starterFiles,
      activeFile: firstFile
    };

    const player2 = {
      id: opponent.id,
      realName: opponent.realName,
      displayName: opponent.realName,
      anonymous: false,
      avatar: opponent.avatar,
      isReady: false,
      progress: 0,
      completed: false,
      score: 0,
      files: opponentFiles,
      activeFile: firstFile
    };

    this.createdSub?.unsubscribe();
    this.createdSub = this.socketService
      .createMatch(player1, player2, selectedTask)
      .subscribe({
        next: ({ matchId, match }) => {
          localStorage.setItem('matchId', matchId);
          localStorage.setItem('userId', match.players[0].id);

          this.challengeService.setMatch(match);

          this.eventsSub?.unsubscribe();
          this.eventsSub = this.socketService
            .connectToMatchEvents(matchId)
            .subscribe({
              next: ({ event, data }) => {
                if (event === 'match_updated') {
                  this.challengeService.setMatch(data as WeeklyChallengeMatch);
                }
              },
              error: (error) => {
                console.error('Match events error:', error);
              }
            });

          this.router.navigate(['/challenge/lobby']);
        },
        error: (error) => {
          console.error('Create match failed:', error);
        }
      });
  }

  joinMatch(): void {
    if (!this.joinMatchId || !this.joiningAsUserId) return;

    localStorage.setItem('matchId', this.joinMatchId);
    localStorage.setItem('userId', this.joiningAsUserId);

    this.eventsSub?.unsubscribe();
    this.eventsSub = this.socketService
      .connectToMatchEvents(this.joinMatchId)
      .subscribe({
        next: ({ event, data }) => {
          if (event === 'match_updated') {
            this.challengeService.setMatch(data as WeeklyChallengeMatch);
          }
        },
        error: (error) => {
          console.error('Match events error:', error);
        }
      });

    this.joinedSub?.unsubscribe();
    this.joinedSub = this.socketService
      .joinMatch(this.joinMatchId, this.joiningAsUserId)
      .subscribe({
        next: ({ match }) => {
          this.challengeService.setMatch(match);
          this.router.navigate(['/challenge/lobby']);
        },
        error: (error) => {
          console.error('Join match failed:', error);
        }
      });
  }

  ngOnDestroy(): void {
    this.createdSub?.unsubscribe();
    this.joinedSub?.unsubscribe();
    this.eventsSub?.unsubscribe();
  }
}