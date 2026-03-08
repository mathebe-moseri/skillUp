export interface navItem {
  label: string;
  hasPreview: boolean;
  locked?: boolean;
  featured?: boolean;
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
    featured: true
  },
  { label: 'Practice Exercises', hasPreview: true },
  { label: 'Take a Quiz', hasPreview: true },
  { label: 'Interview Questions', hasPreview: true, locked: true },
  { label: 'Track Progress', hasPreview: true, locked: true },
  { label: 'Weekly Challenge', hasPreview: true, locked: true },
  { label: 'Interview Arena', hasPreview: true }
];