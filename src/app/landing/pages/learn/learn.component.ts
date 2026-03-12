import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';
import { UiStateService } from '../../../shared/state/ui-state.service';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [FormsModule, CommonModule, NavComponent],
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
  currentQuestionIndex = 0;

  dataBindingTopics: string[] = [
    'Interpolation',
    'Property Binding',
    'Event Binding',
    'Two-Way Binding',
  ];

  decoratorTopics: string[] = [
    '@Input()',
    // '@Output()',
    // '@ViewChild()',
    // '@ViewChildren()',
    // '@ContentChild()',
    // '@ContentChildren()',
    // '@HostBinding()',
    // '@HostListener()',
  ];

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
  }

  selectConceptOnly(conceptName: string): void {
    this.selectedConcept = conceptName;
    this.selectedSubtopic = '';
    this.expandedConcept = conceptName;
  }

  selectSubtopic(conceptName: string, subtopic: string): void {
    this.selectedConcept = conceptName;
    this.selectedSubtopic = subtopic;
    this.expandedConcept = conceptName;
    this.isConceptMenuOpen = false;
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
    this.currentQuestionIndex++;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.concept-dropdown')) {
      this.isConceptMenuOpen = false;
    }
  }
}