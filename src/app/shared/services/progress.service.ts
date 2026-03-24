import { Injectable, signal } from '@angular/core';
import {
  TopicProgress,
  ProgressSummary,
  QuizProgressItem,
  InterviewProgressItem,
  PracticeProgressItem,
  VideoProgressItem
} from '../models/progress.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly storageKey = 'skillup-progress';

  readonly topicProgress = signal<Record<string, TopicProgress>>(this.loadFromStorage());

  private loadFromStorage(): Record<string, TopicProgress> {
    if (typeof localStorage === 'undefined') {
      return {};
    }

    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : {};
  }

  private persist(data: Record<string, TopicProgress>): void {
    this.topicProgress.set(data);
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private ensureTopic(topic: string): TopicProgress {
    const state = this.topicProgress();
    const existing = state[topic];

    if (existing) {
      return existing;
    }

    return {
      topic,
      videos: [],
      quizzes: [],
      interviews: [],
      practices: []
    };
  }

  getTopicProgress(topic: string): TopicProgress {
    return this.ensureTopic(topic);
  }

  setTopicSeed(topic: string, seed: Partial<TopicProgress>): void {
    const state = this.topicProgress();
    const current = this.ensureTopic(topic);

    const next: TopicProgress = {
      topic,
      videos: seed.videos ?? current.videos,
      quizzes: seed.quizzes ?? current.quizzes,
      interviews: seed.interviews ?? current.interviews,
      practices: seed.practices ?? current.practices
    };

    this.persist({
      ...state,
      [topic]: next
    });
  }

  markVideoProgress(topic: string, item: VideoProgressItem): void {
    const state = this.topicProgress();
    const current = this.ensureTopic(topic);

    const videos = this.upsert(current.videos, item);
    this.persist({
      ...state,
      [topic]: { ...current, videos }
    });
  }

  markQuizProgress(topic: string, item: QuizProgressItem): void {
    const state = this.topicProgress();
    const current = this.ensureTopic(topic);

    const quizzes = this.upsert(current.quizzes, item);
    this.persist({
      ...state,
      [topic]: { ...current, quizzes }
    });
  }

  markInterviewProgress(topic: string, item: InterviewProgressItem): void {
    const state = this.topicProgress();
    const current = this.ensureTopic(topic);

    const interviews = this.upsert(current.interviews, item);
    this.persist({
      ...state,
      [topic]: { ...current, interviews }
    });
  }

  markPracticeProgress(topic: string, item: PracticeProgressItem): void {
    const state = this.topicProgress();
    const current = this.ensureTopic(topic);

    const practices = this.upsert(current.practices, item);
    this.persist({
      ...state,
      [topic]: { ...current, practices }
    });
  }

  getSummary(topic: string): ProgressSummary {
    const progress = this.getTopicProgress(topic);

    const videosWatched = progress.videos.filter(v => v.watched).length;
    const quizzesCompleted = progress.quizzes.filter(q => q.completed).length;
    const interviewQuestionsCompleted = progress.interviews.filter(i => i.completed).length;
    const practicesCompleted = progress.practices.filter(p => p.completed).length;

    const quizScores = progress.quizzes
      .filter(q => q.completed)
      .map(q => q.score);

    const practiceScores = progress.practices
      .filter(p => p.completed && typeof p.score === 'number')
      .map(p => p.score as number);

    const averageQuizScore = quizScores.length
      ? Math.round(quizScores.reduce((sum, value) => sum + value, 0) / quizScores.length)
      : 0;

    const averagePracticeScore = practiceScores.length
      ? Math.round(practiceScores.reduce((sum, value) => sum + value, 0) / practiceScores.length)
      : 0;

    const completedCount =
      videosWatched +
      quizzesCompleted +
      interviewQuestionsCompleted +
      practicesCompleted;

    const totalCount =
      progress.videos.length +
      progress.quizzes.length +
      progress.interviews.length +
      progress.practices.length;

    const overallCompletion = totalCount
      ? Math.round((completedCount / totalCount) * 100)
      : 0;

    return {
      videosWatched,
      totalVideos: progress.videos.length,
      quizzesCompleted,
      totalQuizzes: progress.quizzes.length,
      interviewQuestionsCompleted,
      totalInterviewQuestions: progress.interviews.length,
      practicesCompleted,
      totalPractices: progress.practices.length,
      averageQuizScore,
      averagePracticeScore,
      overallCompletion
    };
  }

  private upsert<T extends { id: string }>(items: T[], nextItem: T): T[] {
    const index = items.findIndex(item => item.id === nextItem.id);

    if (index === -1) {
      return [...items, nextItem];
    }

    const updated = [...items];
    updated[index] = nextItem;
    return updated;
  }
}