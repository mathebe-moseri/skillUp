import { Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LearnComponent } from './landing/pages/learn/learn.component';
import { PracticeComponent } from './landing/pages/practice/practice.component';
import { QuizComponent } from './landing/pages/quiz/quiz.component';
import { InterviewComponent } from './landing/pages/interview/interview.component';
import { ProgressComponent } from './landing/pages/progress/progress.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'learn/:topic',
    component: LearnComponent
  },
  {
    path: 'practice/:topic',
    component: PracticeComponent
  },
  {
    path: 'quiz/:topic',
    component: QuizComponent
  },
    {
    path: 'interview/:topic',
    component: InterviewComponent
  },
    {
    path: 'progress/:topic',
    component: ProgressComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];