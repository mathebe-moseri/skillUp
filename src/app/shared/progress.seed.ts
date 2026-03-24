// import {
//   InterviewProgressItem,
//   PracticeProgressItem,
//   QuizProgressItem,
//   VideoProgressItem
// } from '../../../shared/models/progress.model';
// import { ANGULAR_INPUT_INTERVIEW_QUESTIONS } from '../../../constants';

import { ANGULAR_INPUT_INTERVIEW_QUESTIONS } from "../constants";
import { InterviewProgressItem, PracticeProgressItem, QuizProgressItem, VideoProgressItem } from "./models/progress.model";

export const ANGULAR_VIDEO_SEED: VideoProgressItem[] = [
  {
    id: 'video-input-introduction',
    title: '@Input Introduction',
    watched: true,
    watchedSeconds: 420,
    totalSeconds: 420,
    completedAt: new Date().toISOString()
  },
  {
    id: 'video-input-parent-child',
    title: 'Parent to Child Communication',
    watched: false,
    watchedSeconds: 180,
    totalSeconds: 540
  },
  {
    id: 'video-input-ngonchanges',
    title: '@Input with ngOnChanges',
    watched: false,
    watchedSeconds: 0,
    totalSeconds: 600
  }
];

export const ANGULAR_QUIZ_SEED: QuizProgressItem[] = [
  {
    id: 'quiz-angular-input-1',
    title: '@Input Fundamentals Quiz',
    completed: false,
    score: 0,
    totalQuestions: 10
  }
];

export const ANGULAR_INTERVIEW_SEED: InterviewProgressItem[] =
  ANGULAR_INPUT_INTERVIEW_QUESTIONS.map(question => ({
    id: `interview-${question.id}`,
    question: question.question,
    completed: false,
    answerGiven: false,
    sampleAnswerViewed: false
  }));

export const ANGULAR_PRACTICE_SEED: PracticeProgressItem[] = [
  {
    id: 'practice-input-basic',
    title: 'Pass Data from Parent to Child',
    completed: false
  },
  {
    id: 'practice-input-object-binding',
    title: 'Bind Object Data with @Input',
    completed: false
  }
];