export interface navItem {
  label: string;
  hasPreview: boolean;
  locked?: boolean;
  featured?: boolean;
  description?: string;
  icon?: string;
}

export const Learning_Path: navItem[] = [
  { label: 'Web Basics (Start Here)', hasPreview: false },
  { label: 'HTML', hasPreview: false },
  { label: 'CSS', hasPreview: false },
  { label: 'JavaScript', hasPreview: true },
  { label: 'TypeScript', hasPreview: false },
  { label: 'Angular', hasPreview: true }
];

export const Learning_Path_Actions: navItem[] = [
  {
    label: 'Open Learning Page',
    hasPreview: true,
    featured: true,
    icon: '+',
    description: 'Concepts, video lessons, and guided explanations'
  },
  {
    label: 'Practice Exercises',
    hasPreview: true,
    icon: '📝',
    description: 'Practice interactive exercises and coding challenges'
  },
  {
    label: 'Take a Quiz',
    hasPreview: true,
    icon: '❓',
    description: 'Test your knowledge and review key concepts'
  },
  {
    label: 'Interview Questions',
    hasPreview: true,
    locked: true,
    icon: '🔒',
    description: 'Prepare for interviews with topic-based questions'
  },
  {
    label: 'Track Progress',
    hasPreview: true,
    locked: true,
    icon: '📊',
    description: 'Monitor your learning journey and achievements'
  },
  {
    label: 'Weekly Challenge',
    hasPreview: true,
    locked: true,
    icon: '🗓️',
    description: 'Take on weekly tasks to sharpen your skills'
  },
  {
    label: 'Interview Arena',
    hasPreview: true,
    icon: '🏆',
    description: 'Compete when you unlock mastery level performance'
  }
];
