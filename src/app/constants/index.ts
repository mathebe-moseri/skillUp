// dropdown navigation items

export interface navItem {
  label: string,
  hasPreview: boolean
}

export const Learning_Path: navItem[] = [
  { label: 'Web Basics (Start Here)', hasPreview: false },
  { label: 'HTML', hasPreview: false },
  { label: 'CSS', hasPreview: false },
  { label: 'JavaScript', hasPreview: true },
  { label: 'TypeScript', hasPreview: false },
  { label: 'Angular', hasPreview: true }
]


export const Learning_Path_Actions = [
  { label: 'Start Learning', hasPreview: true },
  { label: 'Practice', hasPreview: true },
  { label: 'Take a Quiz', hasPreview: true },
  { label: 'Interview Questions 🔒', hasPreview: true },
  { label: 'Track Progress 🔒', hasPreview: true },
  { label: 'Weekly Challenge 🔒', hasPreview: true },

  // Premium mastery stage
  { label: 'Compete 🏆  🔒', hasPreview: true, locked: true }
];

