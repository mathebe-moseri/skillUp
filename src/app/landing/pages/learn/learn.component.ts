import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [FormsModule, CommonModule, NavComponent],
  templateUrl: './learn.component.html',
})
export class LearnComponent {
decoratorTopics: any;
dataBindingTopics: any;
routeTopics: any;
  constructor(private router: Router) {}

  selectedConcept = '';
  selectedSubtopic = '';

  isConceptMenuOpen = false;
  expandedConcept: string | null = null;

    currentQuestionIndex = 0;

  angularConcepts = [
    {
      name: 'Data Binding',
      subtopics: [
        'Interpolation',
        'Property Binding',
        'Event Binding',
        'Two-Way Binding',
      ],
    },
    {
      name: 'Decorators',
      subtopics: [
        '@Component',
        '@NgModule',
        '@Input',
        '@Output',
        '@Injectable',
        '@Directive',
        '@Pipe',
        '@HostBinding',
        '@HostListener',
        '@ViewChild',
        '@ViewChildren',
        '@ContentChild',
        '@ContentChildren',
      ],
    },
    {
      name: 'Routes',
      subtopics: [
        'RouterModule',
        'routerLink',
        'router-outlet',
        'Route Parameters',
        'Child Routes',
        'Lazy Loading',
        'Route Guards',
      ],
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
    this.isConceptMenuOpen = true;
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

goToNextExplanation() {
  this.currentQuestionIndex++;
}
}