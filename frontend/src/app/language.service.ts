import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

export type Language = 'en' | 'es' | 'gl' | 'rly';
export type TranslationKey =
    | 'language'
    | 'viewProject'
    | 'creator'
    | 'projectFallback'
    | 'underConstruction';

export interface LanguageOption {
    code: Language;
    name: string;
}

const TRANSLATIONS: Record<Exclude<Language, 'rly'>, Record<TranslationKey, string>> = {
    en: {
        language: 'Language',
        viewProject: 'View project',
        creator: 'Creator / maintainer',
        projectFallback: 'Project',
        underConstruction: 'Page under construction'
    },
    es: {
        language: 'Idioma',
        viewProject: 'Ver proyecto',
        creator: 'Creador / responsable',
        projectFallback: 'Proyecto',
        underConstruction: 'Página en construcción'
    },
    gl: {
        language: 'Idioma',
        viewProject: 'Ver proxecto',
        creator: 'Creador / responsable',
        projectFallback: 'Proxecto',
        underConstruction: 'Páxina en construción'
    }
};

const PROJECT_DESCRIPTIONS: Record<string, Partial<Record<Exclude<Language, 'rly'>, string>>> = {
    'osiris-spelling-software': {
        es: 'Herramienta de investigación que permite consultar y comparar las grafías del nombre de Osiris en los Textos de los Sarcófagos del Reino Medio.',
        gl: 'Ferramenta de investigación que permite consultar e comparar as grafías do nome de Osiris nos Textos dos Sarcófagos do Reino Medio.'
    }
};

const ZALGO_ABOVE = ['\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0307', '\u0308'];
const ZALGO_BELOW = ['\u0316', '\u0317', '\u0318', '\u0319', '\u0323', '\u0324', '\u0325'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
    private readonly document = inject(DOCUMENT);

    readonly language = signal<Language>('en');
    readonly options: readonly LanguageOption[] = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'gl', name: 'Galego' },
        { code: 'rly', name: 'R’lyehiano' }
    ];

    constructor() {
        effect(() => {
            const language = this.language();
            this.document.documentElement.lang = language === 'rly' ? 'x-rlyeh' : language;
        });
    }

    setLanguage(language: Language): void {
        this.language.set(language);
    }

    languageName(language = this.language()): string {
        return this.options.find(option => option.code === language)?.name ?? 'English';
    }

    text(key: TranslationKey): string {
        const language = this.language();
        const source = TRANSLATIONS[language === 'rly' ? 'en' : language][key];
        return language === 'rly' ? this.toZalgo(source) : source;
    }

    projectDescription(projectId: string, fallback: string): string {
        const language = this.language();

        if (language === 'rly') {
            return this.toZalgo(fallback);
        }

        return PROJECT_DESCRIPTIONS[projectId]?.[language] ?? fallback;
    }

    content(value: string): string {
        return this.language() === 'rly' ? this.toZalgo(value) : value;
    }

    private toZalgo(value: string): string {
        return Array.from(value).map((character, index) => {
            if (/\s/.test(character)) {
                return character;
            }

            const code = character.codePointAt(0) ?? index;
            const above = ZALGO_ABOVE[(code + index) % ZALGO_ABOVE.length];
            const below = ZALGO_BELOW[(code * 3 + index) % ZALGO_BELOW.length];
            const extra = index % 3 === 0
                ? ZALGO_ABOVE[(code + index + 3) % ZALGO_ABOVE.length]
                : '';

            return `${character}${above}${below}${extra}`;
        }).join('');
    }
}