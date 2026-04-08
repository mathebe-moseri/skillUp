export interface ChallengeTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  durationSeconds: number;
  starterFiles: Record<string, string>; // ✅ REQUIRED
}

export const CHALLENGE_TASKS: ChallengeTask[] = [
  {
    id: 't1',
    title: 'Angular Input Challenge',
    description:
      'Create a child component that receives data from a parent using @Input() and displays it.',
    difficulty: 'easy',
    durationSeconds: 300,
    starterFiles: {
      'src/app/app.component.ts': `import { Component } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  message = 'Hello from Parent';
}
`,
      'src/app/app.component.html': `<h1>Parent Component</h1>
<app-child [text]="message"></app-child>
`,
      'src/app/child.component.ts': `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  templateUrl: './child.component.html'
})
export class ChildComponent {
  @Input() text = '';
}
`,
      'src/app/child.component.html': `<p>{{ text }}</p>`
    }
  },

  {
    id: 't2',
    title: 'Angular List Rendering',
    description:
      'Use *ngFor to display a list of items dynamically in the template.',
    difficulty: 'easy',
    durationSeconds: 180,
    starterFiles: {
      'src/app/app.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {
  items = ['Angular', 'React', 'Vue'];
}
`,
      'src/app/app.component.html': `<h1>Frameworks</h1>
<ul>
  <!-- Render items here -->
</ul>
`
    }
  }
];