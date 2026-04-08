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
  private updatedSub?: Subscription;

  constructor(
    private challengeService: ChallengeService,
    private router: Router,
    private socketService: SocketService
  ) {
    this.createdSub = this.socketService
      .on<{ matchId: string; match: WeeklyChallengeMatch }>('match_created')
      .subscribe(({ matchId, match }) => {
        localStorage.setItem('matchId', matchId);
        localStorage.setItem('userId', match.players[0].id);
        this.challengeService.setMatch(match);
        this.router.navigate(['/challenge/lobby']);
      });

    this.updatedSub = this.socketService
      .on<WeeklyChallengeMatch>('match_updated')
      .subscribe((match) => {
        this.challengeService.setMatch(match);
      });
  }

  startSetup() {
    const currentUser = this.users[0];
    const opponent = this.users.find(user => user.id === this.selectedUserId)!;
    const selectedTask = this.tasks.find(task => task.id === this.selectedTaskId)!;

    const starterFiles = { ...selectedTask.starterFiles };
    const opponentFiles = { ...selectedTask.starterFiles };
    const firstFile = Object.keys(selectedTask.starterFiles)[0];

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

    this.socketService.emit('create_match', {
      task: selectedTask,
      player1,
      player2
    });
  }

  joinMatch() {
    if (!this.joinMatchId || !this.joiningAsUserId) return;

    localStorage.setItem('matchId', this.joinMatchId);
    localStorage.setItem('userId', this.joiningAsUserId);

    this.socketService.emit('join_match', {
      matchId: this.joinMatchId
    });

    this.router.navigate(['/challenge/lobby']);
  }

  ngOnDestroy(): void {
    this.createdSub?.unsubscribe();
    this.updatedSub?.unsubscribe();
  }
}