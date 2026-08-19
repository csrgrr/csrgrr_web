import { Component, inject, Input } from '@angular/core';
import { LanguageService } from '../../language.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  readonly i18n = inject(LanguageService);

  @Input({ required: true })
  project!: Project;

}