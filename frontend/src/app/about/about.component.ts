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

    readonly profileLinks = [
        { label: 'GitHub', url: 'https://github.com/csrgrr' },
        { label: 'Academia.edu', url: 'https://uah-es.academia.edu/CesarGuerra' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/c%C3%A9sar-guerra-m%C3%A9ndez-65a362118/' },
        { label: 'Portfolio', url: 'https://csrgrr.github.io/' }
    ];
}