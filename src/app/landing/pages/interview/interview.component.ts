import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ANGULAR_INPUT_INTERVIEW_QUESTIONS,
  InterviewQuestionItem
} from '../../../constants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css'
})
export class InterviewComponent {
  readonly topic = signal('');
  readonly currentIndex = signal(0);
  readonly userAnswer = signal('');
  readonly showSampleAnswer = signal(false);
  readonly showFeedback = signal(false);

  readonly questions = computed<InterviewQuestionItem[]>(() => {
    const topic = this.topic().toLowerCase();

    if (topic === 'angular') {
      return ANGULAR_INPUT_INTERVIEW_QUESTIONS;
    }

    return [];
  });

  readonly currentQuestion = computed<InterviewQuestionItem | null>(() => {
    const allQuestions = this.questions();
    const index = this.currentIndex();
    return allQuestions[index] ?? null;
  });

  readonly progressPercent = computed(() => {
    const allQuestions = this.questions();
    if (!allQuestions.length) return 0;
    return ((this.currentIndex() + 1) / allQuestions.length) * 100;
  });

  readonly isFirstQuestion = computed(() => this.currentIndex() === 0);

  readonly isLastQuestion = computed(() => {
    return this.currentIndex() === this.questions().length - 1;
  });

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.topic.set(params.get('topic') ?? '');
      this.resetInterview();
    });
  }

  resetInterview(): void {
    this.currentIndex.set(0);
    this.userAnswer.set('');
    this.showSampleAnswer.set(false);
    this.showFeedback.set(false);
  }

  submitMyAnswer(): void {
    if (!this.userAnswer().trim()) return;
    this.showFeedback.set(true);
  }

  revealSampleAnswer(): void {
    this.showSampleAnswer.set(true);
  }

  nextQuestion(): void {
    if (this.isLastQuestion()) return;

    this.currentIndex.update(value => value + 1);
    this.userAnswer.set('');
    this.showSampleAnswer.set(false);
    this.showFeedback.set(false);
  }

  previousQuestion(): void {
    if (this.isFirstQuestion()) return;

    this.currentIndex.update(value => value - 1);
    this.userAnswer.set('');
    this.showSampleAnswer.set(false);
    this.showFeedback.set(false);
  }
}