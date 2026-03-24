export interface VideoProgressItem {
  id: string;
  title: string;
  watched: boolean;
  watchedSeconds: number;
  totalSeconds: number;
  completedAt?: string;
}

export interface QuizProgressItem {
  id: string;
  title: string;
  completed: boolean;
  score: number;
  totalQuestions: number;
  completedAt?: string;
}

export interface InterviewProgressItem {
  id: string;
  question: string;
  completed: boolean;
  answerGiven: boolean;
  sampleAnswerViewed: boolean;
  completedAt?: string;
}

export interface PracticeProgressItem {
  id: string;
  title: string;
  completed: boolean;
  submittedAnswer?: string;
  score?: number;
  feedback?: string;
  completedAt?: string;
}

export interface TopicProgress {
  topic: string;
  videos: VideoProgressItem[];
  quizzes: QuizProgressItem[];
  interviews: InterviewProgressItem[];
  practices: PracticeProgressItem[];
}

export interface ProgressSummary {
  videosWatched: number;
  totalVideos: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  interviewQuestionsCompleted: number;
  totalInterviewQuestions: number;
  practicesCompleted: number;
  totalPractices: number;
  averageQuizScore: number;
  averagePracticeScore: number;
  overallCompletion: number;
}