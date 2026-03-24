import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ANGULAR_INTERVIEW_SEED, ANGULAR_PRACTICE_SEED, ANGULAR_QUIZ_SEED, ANGULAR_VIDEO_SEED } from '../../../shared/progress.seed';
import { ProgressService } from '../../../shared/services/progress.service';
// import { ProgressService } from '../../../shared/state/progress.service';
// import {
//   ANGULAR_INTERVIEW_SEED,
//   ANGULAR_PRACTICE_SEED,
//   ANGULAR_QUIZ_SEED,
//   ANGULAR_VIDEO_SEED
// } from './progress.seed';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  readonly topic = signal('');

  readonly progress = computed(() => {
    const currentTopic = this.topic();
    if (!currentTopic) return null;
    return this.progressService.getTopicProgress(currentTopic);
  });

  readonly summary = computed(() => {
    const currentTopic = this.topic();
    if (!currentTopic) return null;
    return this.progressService.getSummary(currentTopic);
  });

  constructor(
    private route: ActivatedRoute,
    private progressService: ProgressService
  ) {
    this.route.paramMap.subscribe(params => {
      const topic = params.get('topic') ?? '';
      this.topic.set(topic);

      if (topic === 'angular') {
        const current = this.progressService.getTopicProgress(topic);

        this.progressService.setTopicSeed(topic, {
          videos: current.videos.length ? current.videos : ANGULAR_VIDEO_SEED,
          quizzes: current.quizzes.length ? current.quizzes : ANGULAR_QUIZ_SEED,
          interviews: current.interviews.length ? current.interviews : ANGULAR_INTERVIEW_SEED,
          practices: current.practices.length ? current.practices : ANGULAR_PRACTICE_SEED
        });
      }
    });
  }

  getPerformanceMessage(overallCompletion: number): string {
    if (overallCompletion >= 80) {
      return 'Excellent progress. You are building strong consistency.';
    }

    if (overallCompletion >= 50) {
      return 'Good momentum. Keep pushing through the remaining work.';
    }

    if (overallCompletion >= 25) {
      return 'A solid start. More practice will improve mastery.';
    }

    return 'You are just getting started. Begin with videos, then move into practice and quizzes.';
  }
}