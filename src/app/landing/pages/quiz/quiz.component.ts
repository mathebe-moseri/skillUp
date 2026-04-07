import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressService } from '../../../shared/services/progress.service';

interface QuizOption {
  text: string;
  correct: boolean;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
  explanation: string;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  private readonly progressService = inject(ProgressService);
  private readonly route = inject(ActivatedRoute);

  topic = 'angular';

  quizId = 'angular-input-quiz';
  quizTitle = '@Input() Decorator Quiz';

 questions: QuizQuestion[] = [
    {
      question: '1. What is the main purpose of the @Input() decorator in Angular?',
      options: [
        { text: 'To send data from a child component to a parent component', correct: false },
        { text: 'To allow a parent component to pass data into a child component', correct: true },
        { text: 'To create services inside a component', correct: false },
        { text: 'To handle form submissions', correct: false }
      ],
      explanation: '@Input() is used for parent-to-child communication.'
    },
    {
      question: '2. Where is @Input() usually placed?',
      options: [
        { text: 'On a method inside a service', correct: false },
        { text: 'On a property inside a child component', correct: true },
        { text: 'On the parent component selector', correct: false },
        { text: 'Inside the HTML template only', correct: false }
      ],
      explanation: '@Input() decorates a property in the child component so it can receive data.'
    },
    {
      question: '3. If a parent passes a value to a child using @Input(), who owns the original data?',
      options: [
        { text: 'The child component', correct: false },
        { text: 'The parent component', correct: true },
        { text: 'Both equally', correct: false },
        { text: 'Angular automatically stores it globally', correct: false }
      ],
      explanation: 'The parent owns the data and passes it down to the child.'
    },
    {
      question: '4. Why is @Input() important for reusable components?',
      options: [
        { text: 'Because it allows a child component to receive different values in different contexts', correct: true },
        { text: 'Because it removes the need for templates', correct: false },
        { text: 'Because it only works with forms', correct: false },
        { text: 'Because it makes all properties public automatically', correct: false }
      ],
      explanation: '@Input() makes components flexible and reusable by allowing dynamic values from parents.'
    },
    {
      question: '5. What happens if a parent does not provide a value for an @Input() property?',
      options: [
        { text: 'Angular throws an error every time', correct: false },
        { text: 'The property may remain undefined unless a default value is set', correct: true },
        { text: 'The app stops compiling', correct: false },
        { text: 'The child automatically creates a random value', correct: false }
      ],
      explanation: 'If no value is passed, the @Input() property is undefined unless you initialize it.'
    },
    {
      question: '6. Which statement best describes data flow with @Input()?',
      options: [
        { text: 'It creates two-way data flow by default', correct: false },
        { text: 'It supports one-way data flow from parent to child', correct: true },
        { text: 'It only works from child to parent', correct: false },
        { text: 'It sends data between unrelated components automatically', correct: false }
      ],
      explanation: '@Input() is for one-way parent-to-child data binding.'
    },
    {
      question: '7. When should you use @Input() instead of hardcoding values inside a child component?',
      options: [
        { text: 'When the value should change depending on where the component is used', correct: true },
        { text: 'Only when using services', correct: false },
        { text: 'Only when the component has no template', correct: false },
        { text: 'Never, hardcoding is always better', correct: false }
      ],
      explanation: 'Use @Input() when a component should behave differently based on parent-provided data.'
    },
    {
      question: '8. A child component receives an object through @Input(). What is the main thing to be careful about?',
      options: [
        { text: 'Objects cannot be passed with @Input()', correct: false },
        { text: 'Changing the object inside the child can affect the parent’s data', correct: true },
        { text: 'Angular automatically freezes the object', correct: false },
        { text: 'The object becomes a string in the child', correct: false }
      ],
      explanation: 'Objects are passed by reference, so mutating them in the child can affect the parent.'
    },
    {
      question: '9. Which situation shows a good use of @Input()?',
      options: [
        { text: 'A product-card component receiving product name and price from its parent', correct: true },
        { text: 'A service injecting itself into a component', correct: false },
        { text: 'A button directly updating unrelated components', correct: false },
        { text: 'A route guarding user navigation', correct: false }
      ],
      explanation: 'Reusable UI components like product cards commonly receive data through @Input().'
    },
    {
      question: '10. What idea should a learner understand most about @Input()?',
      options: [
        { text: 'It is mainly about styling components', correct: false },
        { text: 'It helps components communicate in a clear parent-to-child structure', correct: true },
        { text: 'It replaces all event handling', correct: false },
        { text: 'It is only useful in large projects', correct: false }
      ],
      explanation: '@Input() is fundamentally about communication and component design.'
    },
    // {
    //   question: '11. If a child component needs to display dynamic data from different parents, what Angular feature makes this possible?',
    //   options: [
    //     { text: 'Services', correct: false },
    //     { text: 'Routing', correct: false },
    //     { text: '@Input()', correct: true },
    //     { text: 'Pipes', correct: false }
    //   ],
    //   explanation: '@Input() allows a child component to receive different values from different parent components.'
    // },
    // {
    //   question: '12. What happens if the parent updates a primitive value passed via @Input()?',
    //   options: [
    //     { text: 'Child automatically receives the updated value', correct: true },
    //     { text: 'Child keeps the old value forever', correct: false },
    //     { text: 'Angular throws an error', correct: false },
    //     { text: 'The page reloads', correct: false }
    //   ],
    //   explanation: 'When the parent updates a primitive input value, Angular passes the new value to the child.'
    // },
    // {
    //   question: '13. Why is @Input() considered part of component communication?',
    //   options: [
    //     { text: 'Because it allows components to share templates', correct: false },
    //     { text: 'Because it allows parent-to-child data flow', correct: true },
    //     { text: 'Because it allows routing navigation', correct: false },
    //     { text: 'Because it manages global state', correct: false }
    //   ],
    //   explanation: '@Input() is one of Angular’s core tools for component communication.'
    // },
    // {
    //   question: '14. You hardcode a value inside the child component instead of using @Input(). What is the main downside?',
    //   options: [
    //     { text: 'The component becomes harder to reuse', correct: true },
    //     { text: 'The app will not compile', correct: false },
    //     { text: 'Angular blocks rendering', correct: false },
    //     { text: 'The router breaks', correct: false }
    //   ],
    //   explanation: 'Hardcoding values reduces flexibility and makes the component less reusable.'
    // },
    // {
    //   question: '15. Two parent components use the same child component but need different data. What is the best design approach?',
    //   options: [
    //     { text: 'Duplicate the child component', correct: false },
    //     { text: 'Use @Input() to pass different values', correct: true },
    //     { text: 'Create a global variable', correct: false },
    //     { text: 'Use an HTTP request', correct: false }
    //   ],
    //   explanation: '@Input() lets one reusable child component behave differently based on parent-provided values.'
    // },
    // {
    //   question: '16. If a child component modifies an object received via @Input(), what architectural risk exists?',
    //   options: [
    //     { text: 'The parent UI may unexpectedly change', correct: true },
    //     { text: 'Angular deletes the object', correct: false },
    //     { text: 'A memory leak occurs', correct: false },
    //     { text: 'Routing resets', correct: false }
    //   ],
    //   explanation: 'Objects are passed by reference, so changing them in the child can affect the parent unexpectedly.'
    // },
    // {
    //   question: '17. Parent template: <app-user-card [userData]="user"></app-user-card>. Child component: @Input() user; UI shows nothing. What is the most likely problem?',
    //   options: [
    //     { text: 'Property name mismatch', correct: true },
    //     { text: 'Angular version is outdated', correct: false },
    //     { text: 'Selector is missing', correct: false },
    //     { text: 'The component is standalone', correct: false }
    //   ],
    //   explanation: 'The parent is binding to userData, but the child input is named user. The names must match unless an alias is used.'
    // },
    // {
    //   question: '18. Parent passes data but Angular shows: "Can\'t bind to \'product\' since it isn\'t a known property". What is most likely missing?',
    //   options: [
    //     { text: '@Output()', correct: false },
    //     { text: '@Input() decorator in the child', correct: true },
    //     { text: 'RouterModule', correct: false },
    //     { text: 'HttpClient', correct: false }
    //   ],
    //   explanation: 'Angular must know that the child component property is an input by using @Input().'
    // },
    // {
    //   question: '19. A child receives a value once but does not react when the parent changes it. Which lifecycle hook can help?',
    //   options: [
    //     { text: 'ngOnInit', correct: false },
    //     { text: 'ngAfterViewInit', correct: false },
    //     { text: 'ngOnChanges', correct: true },
    //     { text: 'ngDestroy', correct: false }
    //   ],
    //   explanation: 'ngOnChanges helps respond to changes in input values over time.'
    // },
    // {
    //   question: '20. Parent updates an object property like this.user.name = "John", but the child UI does not update with OnPush strategy. What is the best fix?',
    //   options: [
    //     { text: 'Reload the page', correct: false },
    //     { text: 'Create a new object reference', correct: true },
    //     { text: 'Add a service', correct: false },
    //     { text: 'Remove the selector', correct: false }
    //   ],
    //   explanation: 'With OnPush, Angular often checks object references. Creating a new object reference helps Angular detect the change.'
    // },
    // {
    //   question: '21. Why does Angular sometimes not detect changes when only object properties change?',
    //   options: [
    //     { text: 'Because Angular compares references, not deep values', correct: true },
    //     { text: 'Because templates are cached', correct: false },
    //     { text: 'Because inputs are async', correct: false },
    //     { text: 'Because routing interrupts updates', correct: false }
    //   ],
    //   explanation: 'Angular change detection, especially with OnPush, often depends on reference changes rather than deep mutation checks.'
    // },
    // {
    //   question: '22. When should you NOT use @Input()?',
    //   options: [
    //     { text: 'For sibling communication without parent involvement', correct: true },
    //     { text: 'For reusable UI components', correct: false },
    //     { text: 'For passing display data', correct: false },
    //     { text: 'For configuration values', correct: false }
    //   ],
    //   explanation: '@Input() is for parent-to-child communication, not direct sibling-to-sibling communication.'
    // },
    // {
    //   question: '23. What is the best way to send data from child to parent?',
    //   options: [
    //     { text: '@Input()', correct: false },
    //     { text: '@Output() with EventEmitter', correct: true },
    //     { text: 'Service injection', correct: false },
    //     { text: 'Router navigate', correct: false }
    //   ],
    //   explanation: '@Output() is used for child-to-parent communication.'
    // },
    // {
    //   question: '24. You write <app-card title="Hello"></app-card> and the child has @Input() title: string;. What concept should the learner understand here?',
    //   options: [
    //     { text: 'This is static attribute usage, while [title] is used for dynamic property binding', correct: true },
    //     { text: 'Standalone components cannot use inputs', correct: false },
    //     { text: 'Angular requires a service for string values', correct: false },
    //     { text: 'The title input only works inside routing', correct: false }
    //   ],
    //   explanation: 'title="Hello" passes a static string. [title]="value" is used when the value should come from a component property.'
    // },
    // {
    //   question: '25. A child input is declared as @Input({ required: true }) user!: User;. What happens if the parent does not provide it?',
    //   options: [
    //     { text: 'Angular can report an error because the required input was not provided', correct: true },
    //     { text: 'The component automatically creates a user', correct: false },
    //     { text: 'The page refreshes', correct: false },
    //     { text: 'The router blocks navigation', correct: false }
    //   ],
    //   explanation: 'Required inputs help enforce that a parent must provide a value.'
    // },
    // {
    //   question: '26. Why is component design with @Input() better than using global variables for UI data flow?',
    //   options: [
    //     { text: 'Because it creates clear data ownership and predictable flow', correct: true },
    //     { text: 'Because it makes rendering faster in every case', correct: false },
    //     { text: 'Because it reduces CSS automatically', correct: false },
    //     { text: 'Because it improves routing by default', correct: false }
    //   ],
    //   explanation: '@Input() supports predictable, maintainable component communication with clear ownership of data.'
    // }
  ];

  selectedAnswers: number[] = [];
  currentQuestionIndex = 0;
  submitted = false;
  showExplanation = false;

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.topic = params.get('topic') ?? 'angular';
    });

    this.initializeAnswers();
  }

  initializeAnswers(): void {
    this.selectedAnswers = Array(this.questions.length).fill(-1);
  }

  getCurrentQuestion(): QuizQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(optionIndex: number): void {
    if (!this.submitted) {
      this.selectedAnswers[this.currentQuestionIndex] = optionIndex;
    }
  }

  nextQuestion(): void {
    if (this.selectedAnswers[this.currentQuestionIndex] === -1) {
      return;
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.showExplanation = false;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showExplanation = false;
    }
  }

  submitQuiz(): void {
    if (!this.allQuestionsAnswered()) {
      return;
    }

    this.submitted = true;
    this.showExplanation = true;

    this.progressService.markQuizProgress(this.topic, {
      id: this.quizId,
      title: this.quizTitle,
      completed: true,
      score: this.getScorePercentage(),
      totalQuestions: this.questions.length,
      completedAt: new Date().toISOString()
    });
  }

  finishOrNext(): void {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.submitQuiz();
    } else {
      this.nextQuestion();
    }
  }

  resetQuiz(): void {
    this.initializeAnswers();
    this.currentQuestionIndex = 0;
    this.submitted = false;
    this.showExplanation = false;
  }

  getScore(): number {
    return this.questions.reduce((score, question, questionIndex) => {
      const selectedIndex = this.selectedAnswers[questionIndex];
      if (selectedIndex === -1) {
        return score;
      }
      return question.options[selectedIndex].correct ? score + 1 : score;
    }, 0);
  }

  isCorrect(questionIndex: number, optionIndex: number): boolean {
    return this.questions[questionIndex].options[optionIndex].correct;
  }

  isCurrentAnswerCorrect(): boolean {
    const selectedIndex = this.selectedAnswers[this.currentQuestionIndex];
    if (selectedIndex === -1) {
      return false;
    }
    return this.questions[this.currentQuestionIndex].options[selectedIndex].correct;
  }

  getAnsweredCount(): number {
    return this.selectedAnswers.filter(answer => answer !== -1).length;
  }

  allQuestionsAnswered(): boolean {
    return this.selectedAnswers.every(answer => answer !== -1);
  }

  getProgressPercentage(): number {
    return Math.round(((this.currentQuestionIndex + 1) / this.questions.length) * 100);
  }

  getScorePercentage(): number {
    return Math.round((this.getScore() / this.questions.length) * 100);
  }

  getScoreMessage(): string {
    const percentage = this.getScorePercentage();

    if (percentage === 100) {
      return 'Excellent. You clearly understand how @Input() works.';
    }

    if (percentage >= 80) {
      return 'Great job. Your understanding is strong.';
    }

    if (percentage >= 60) {
      return 'Good effort. You understand the basics, but review a few concepts.';
    }

    if (percentage >= 40) {
      return 'You are getting there, but more practice will help.';
    }

    return 'Review the concepts and try again for stronger understanding.';
  }
}