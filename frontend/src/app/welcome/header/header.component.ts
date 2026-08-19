import { Component, inject } from '@angular/core';
import { Language, LanguageService } from '../../language.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly i18n = inject(LanguageService);

  selectLanguage(language: Language, menu: HTMLDetailsElement): void {
    this.i18n.setLanguage(language);
    menu.open = false;
  }
}
