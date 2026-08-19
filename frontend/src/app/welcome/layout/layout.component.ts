import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, CardListComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}