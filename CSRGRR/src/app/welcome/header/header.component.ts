import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Language, LanguageService } from '../../language.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly navigation = toSignal(this.router.events, { initialValue: null });

  readonly i18n = inject(LanguageService);
  readonly isAboutPage = computed(() => {
    this.navigation();
    return this.router.url === '/about';
  });

  selectLanguage(language: Language, menu: HTMLDetailsElement): void {
    this.i18n.setLanguage(language);
    menu.open = false;
  }
}
