import { Component, inject } from '@angular/core';
import { LanguageService } from '../language.service';
import { HeaderComponent } from '../welcome/header/header.component';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [HeaderComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    readonly i18n = inject(LanguageService);
}