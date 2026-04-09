export interface navItem {
  label: string;
  hasPreview: boolean;
  status?: 'available' | 'coming-soon';
  locked?: boolean;
  featured?: boolean;
  description?: string;
  icon?: string;
}

export const Learning_Path: navItem[] = [
  // { label: 'WebBasics', hasPreview: false, status: 'coming-soon' },
  // { label: 'HTML', hasPreview: false, status: 'coming-soon' },
  // { label: 'CSS', hasPreview: false, status: 'coming-soon' },

  // { label: 'TypeScript', hasPreview: false, status: 'coming-soon' },
  { label: 'Angular', hasPreview: true, status: 'available' },
    { label: 'C#', hasPreview: false, status: 'coming-soon' }
];

export const Learning_Path_Actions: navItem[] = [
{
  label: 'Start Learning',
  hasPreview: true,
  featured: true,
  icon: '▶',
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
  locked: false,
  icon: '💼',
  description: 'Prepare for interviews with topic-based questions'
},
{
  label: 'Track Progress',
  hasPreview: true,
  locked: false,
  icon: '📊',
  description: 'Monitor your learning journey and achievements'
},
  {
    label: 'Weekly Challenge',
    hasPreview: true,
    locked: false,
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



export interface InterviewQuestionItem {
  id: number;
  concept: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  answer: string;
  followUp?: string;
  interviewerChecks?: string[];
}

export const ANGULAR_INPUT_INTERVIEW_QUESTIONS: InterviewQuestionItem[] = [
  {
    id: 1,
    concept: '@Input',
    level: 'beginner',
    question: 'What is @Input in Angular?',
    answer:
      '@Input is a decorator that allows a child component to receive data from its parent component. It is used for parent-to-child communication and helps make components reusable by passing different values into the same child component.',
    followUp: 'Why is @Input useful in component-based architecture?',
    interviewerChecks: [
      'Understands parent-to-child communication',
      'Knows @Input is for reusable components',
      'Can explain Angular component interaction clearly'
    ]
  },
  {
    id: 2,
    concept: '@Input',
    level: 'beginner',
    question: 'How does data flow when using @Input?',
    answer:
      'Data flows one way: from the parent component into the child component. The parent binds a value to the child input property, and the child receives that value. This keeps responsibility clearer and makes component interaction easier to follow.',
    followUp: 'Can a child send data back to the parent using @Input alone?',
    interviewerChecks: [
      'Knows Angular uses one-way input flow here',
      'Can separate @Input from @Output responsibilities'
    ]
  },
  {
    id: 3,
    concept: '@Input',
    level: 'beginner',
    question: 'How do you declare an @Input property in a child component?',
    answer:
      'You import Input from @angular/core and place the @Input decorator above a property in the child component class. That property then becomes bindable from the parent template.',
    followUp: 'What does the parent template syntax usually look like?',
    interviewerChecks: [
      'Knows decorator placement',
      'Understands child property exposure to parent binding'
    ]
  },
  {
    id: 4,
    concept: '@Input',
    level: 'intermediate',
    question: 'What is the difference between passing a primitive value and an object through @Input?',
    answer:
      'When passing primitive values like strings, numbers, or booleans, Angular passes the value itself. When passing an object or array, the child receives a reference to that object. If the child mutates that object directly, the parent may also observe the change because both are pointing to the same reference.',
    followUp: 'Why can direct mutation of input objects be risky?',
    interviewerChecks: [
      'Understands primitive vs reference behavior',
      'Recognizes mutation side effects',
      'Shows awareness of predictable state management'
    ]
  },
  {
    id: 5,
    concept: '@Input',
    level: 'intermediate',
    question: 'Can @Input values change after component initialization?',
    answer:
      'Yes. @Input values can change whenever the parent provides a new value. The child should not assume the value is fixed after initialization. Angular updates the child when the bound parent value changes.',
    followUp: 'Which Angular lifecycle hook is commonly associated with detecting input changes?',
    interviewerChecks: [
      'Knows inputs are not static',
      'Understands parent-driven updates'
    ]
  },
  {
    id: 6,
    concept: '@Input',
    level: 'intermediate',
    question: 'When would you use ngOnChanges with @Input?',
    answer:
      'You use ngOnChanges when the child component needs to react whenever an input value changes. It is useful when you need to run logic based on previous and current values, such as recalculating derived data, validating input changes, or triggering UI updates tied to the new input.',
    followUp: 'How is ngOnChanges different from ngOnInit in this case?',
    interviewerChecks: [
      'Knows when to react to input updates',
      'Can distinguish ngOnChanges from ngOnInit'
    ]
  },
  {
    id: 7,
    concept: '@Input',
    level: 'intermediate',
    question: 'Why should a child component generally avoid changing an @Input value directly?',
    answer:
      'A child component should generally treat input values as incoming data owned by the parent. Directly changing them can make the data flow harder to understand, create side effects, and reduce predictability. A better pattern is to emit an event or work with a local copy when needed.',
    followUp: 'What would be a cleaner alternative if the child needs to request a change?',
    interviewerChecks: [
      'Understands unidirectional data flow',
      'Knows that parent should remain source of truth'
    ]
  },
  {
    id: 8,
    concept: '@Input',
    level: 'advanced',
    question: 'How does @Input help make Angular components reusable?',
    answer:
      '@Input helps make components reusable by separating structure and behavior from the actual data being displayed. The same child component can be reused in different places because the parent can pass different values into it without rewriting the component.',
    followUp: 'Can you give a practical example of a reusable card or badge component using inputs?',
    interviewerChecks: [
      'Understands reusability deeply',
      'Can connect @Input to real UI design'
    ]
  },
  {
    id: 9,
    concept: '@Input',
    level: 'advanced',
    question: 'What is input aliasing in Angular?',
    answer:
      'Input aliasing allows you to expose a different public binding name to the parent while keeping a different property name inside the child component class. This can be useful for clearer API design or backward compatibility.',
    followUp: 'Why might a team choose to alias an input name?',
    interviewerChecks: [
      'Knows Angular input API design concepts',
      'Understands public vs internal naming'
    ]
  },
  {
    id: 10,
    concept: '@Input',
    level: 'advanced',
    question: 'What kind of interview mistake do candidates often make when explaining @Input?',
    answer:
      'A common mistake is describing @Input too narrowly as just a way to pass data, without explaining one-way data flow, reusability, parent ownership of state, or the risks of mutating reference values. Strong answers explain both syntax and design reasoning.',
    followUp: 'What would make that answer stronger in a real interview?',
    interviewerChecks: [
      'Can move beyond syntax',
      'Shows architectural understanding',
      'Communicates clearly like an engineer, not by memorization'
    ]
  }
];