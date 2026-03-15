import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';
import { UiStateService } from '../../../shared/state/ui-state.service';
import { PracticeComponent } from '../practice/practice.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [FormsModule, CommonModule, NavComponent, PracticeComponent],
  templateUrl: './learn.component.html',
})
export class LearnComponent {
  constructor(
    private uiStateService: UiStateService,
    private router: Router
  ) {}

  selectedConcept = '';
  selectedSubtopic = '';

  isConceptMenuOpen = false;
  expandedConcept: string | null = null;

  paragraphIndex = 0;

  dataBindingTopics: string[] = [
    'Interpolation',
    'Property Binding',
    'Event Binding',
    'Two-Way Binding',
  ];

  decoratorTopics: string[] = ['@Input()'];

  routeTopics: string[] = [
    'RouterModule',
    'routerLink',
    'router-outlet',
    'Route Parameters',
    'Child Routes',
    'Lazy Loading',
    'Route Guards',
  ];

  angularConcepts = [
    {
      name: 'Data Binding',
      subtopics: this.dataBindingTopics,
    },
    {
      name: 'Decorators',
      subtopics: this.decoratorTopics,
    },
    {
      name: 'Routes',
      subtopics: this.routeTopics,
    },
  ];

  inputDecoratorParagraphs: string[] = [
    'A decorator in Angular is a special TypeScript function that adds metadata to a class property, method or parameter.',
    'An @Input() is a decorator that marks a class property as bindable, allowing it to receive data from a parent component.',
    'An @Input() allows you to create generic components that can be reused with different data coming from different parent components.',
    'The purpose of an @Input() is to allow a parent component to pass data into a child component.',
    'An @Input() is useful when you want a child component to display different values without changing its internal code.',
    'We use @Input() in Angular to improve reusability, communication between components, and cleaner application structure.',
    'For example, a parent component can pass a user name, title, product details, or any other value to a child component by using @Input().',
    'This helps keep components flexible because the same child component can work with different data in different parts of the application.',
    'Using @Input() also supports a cleaner separation of responsibilities between parent and child components in Angular.',
  ];

  get visibleParagraphs(): string[] {
    return this.inputDecoratorParagraphs.slice(
      this.paragraphIndex,
      this.paragraphIndex + 3
    );
  }

  toggleConceptMenu(): void {
    this.isConceptMenuOpen = !this.isConceptMenuOpen;
  }

  toggleSubmenu(conceptName: string): void {
    if (this.expandedConcept === conceptName) {
      this.expandedConcept = null;
    } else {
      this.expandedConcept = conceptName;
    }

    this.selectedConcept = conceptName;
    this.selectedSubtopic = '';
    this.paragraphIndex = 0;
  }

  selectConceptOnly(conceptName: string): void {
    this.selectedConcept = conceptName;
    this.selectedSubtopic = '';
    this.expandedConcept = conceptName;
    this.paragraphIndex = 0;
  }

  selectSubtopic(conceptName: string, subtopic: string): void {
    this.selectedConcept = conceptName;
    this.selectedSubtopic = subtopic;
    this.expandedConcept = conceptName;
    this.isConceptMenuOpen = false;
    this.paragraphIndex = 0;
  }

  getSubtopics(conceptName: string): string[] {
    const concept = this.angularConcepts.find(
      (item) => item.name === conceptName
    );
    return concept ? concept.subtopics : [];
  }

  goToQuiz(): void {
    this.router.navigate(['/quiz']);
  }

  goToNextExplanation(): void {
    if (this.paragraphIndex + 3 < this.inputDecoratorParagraphs.length) {
      this.paragraphIndex += 3;
    } else {
      this.paragraphIndex = 0;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.concept-dropdown')) {
      this.isConceptMenuOpen = false;
    }
  }
}