import { Component } from '@angular/core';
// import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChallengeService } from '../challenge.service';
import { DEMO_USERS } from '../../../../constants/users';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-challenge-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenge-setup.component.html',
  styleUrl: './challenge-setup.component.css'
})
export class ChallengeSetupComponent {
users = DEMO_USERS;
  selectedUserId = 'u2';
  useAnonymous = false;

  constructor(
    private challengeService: ChallengeService,
    private router: Router
  ) {}

  startSetup() {
    const currentUser = this.users[0];
    const opponent = this.users.find(user => user.id === this.selectedUserId)!;

    const player1 = {
      id: currentUser.id,
      realName: currentUser.realName,
      displayName: this.useAnonymous ? 'CodeFox' : currentUser.realName,
      anonymous: this.useAnonymous,
      avatar: currentUser.avatar,
      isReady: false,
      progress: 0,
      completed: false
    };

    const player2 = {
      id: opponent.id,
      realName: opponent.realName,
      displayName: opponent.realName,
      anonymous: false,
      avatar: opponent.avatar,
      isReady: false,
      progress: 0,
      completed: false
    };

    this.challengeService.createMatch(player1, player2);
    this.router.navigate(['/challenge/lobby']);
  }
}
