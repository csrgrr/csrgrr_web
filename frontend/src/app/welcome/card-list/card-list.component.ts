import { Component } from '@angular/core';
import { PROJECTS } from '../../data/projects';
import { Project } from '../../models/project.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {

  projects: Project[] = PROJECTS;

}