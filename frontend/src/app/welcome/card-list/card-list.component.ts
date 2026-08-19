import { Component, computed, inject, signal } from '@angular/core';
import { PROJECTS } from '../../data/projects';
import { LanguageService, TranslationKey } from '../../language.service';
import { Project, ProjectCategory, ProjectLabel } from '../../models/project.model';
import { CardComponent } from '../card/card.component';

interface ProjectSection {
  id: string;
  title: TranslationKey;
  projects: Project[];
}

type GroupingMode = 'ownership' | 'labels';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  readonly i18n = inject(LanguageService);

  private readonly ownershipSections = [
    { category: ProjectCategory.MyProjects, title: 'myProjects' },
    { category: ProjectCategory.Management, title: 'managedProjects' },
    { category: ProjectCategory.ThirdParty, title: 'thirdPartyProjects' }
  ] as const;

  readonly labelOptions = [
    { label: ProjectLabel.Texts, title: 'texts' },
    { label: ProjectLabel.Collections, title: 'collections' },
    { label: ProjectLabel.Network, title: 'network' },
    { label: ProjectLabel.ArchaeologicalSites, title: 'archaeologicalSites' }
  ] as const;

  readonly projects = PROJECTS;
  readonly selectedLabel = signal<ProjectLabel | null>(null);
  readonly groupingMode = signal<GroupingMode>('ownership');

  readonly sections = computed<ProjectSection[]>(() => {
    const selectedLabel = this.selectedLabel();

    if (selectedLabel) {
      const option = this.labelOptions.find(item => item.label === selectedLabel)!;
      return [{
        id: selectedLabel,
        title: option.title,
        projects: this.projects.filter(project => project.labels.includes(selectedLabel))
      }];
    }

    if (this.groupingMode() === 'labels') {
      return this.labelOptions.map(option => ({
        id: option.label,
        title: option.title,
        projects: this.projects.filter(project => project.labels.includes(option.label))
      }));
    }

    return this.ownershipSections.map(section => ({
      id: section.category,
      title: section.title,
      projects: this.projects.filter(project => project.category === section.category)
    }));
  });

  setFilter(label: ProjectLabel | null, menu: HTMLDetailsElement): void {
    this.selectedLabel.set(label);
    menu.open = false;
  }

  setGroupingMode(mode: GroupingMode): void {
    this.groupingMode.set(mode);
    this.selectedLabel.set(null);
  }
}