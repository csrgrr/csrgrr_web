import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

export type Language = 'en' | 'es' | 'gl' | 'rly';
export type TranslationKey =
    | 'language'
    | 'viewProject'
    | 'creator'
    | 'projectFallback'
    | 'underConstruction'
    | 'myProjects'
    | 'managedProjects'
    | 'thirdPartyProjects'
    | 'filter'
    | 'allLabels'
    | 'defaultView'
    | 'byCategory'
    | 'texts'
    | 'collections'
    | 'network'
    | 'archaeologicalSites';

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
        underConstruction: 'Page under construction',
        myProjects: 'My projects',
        managedProjects: 'Projects I manage',
        thirdPartyProjects: 'Third-party projects',
        filter: 'Filter',
        allLabels: 'All labels',
        defaultView: 'Default',
        byCategory: 'By category',
        texts: 'Texts',
        collections: 'Collections',
        network: 'Network',
        archaeologicalSites: 'Archaeological sites'
    },
    es: {
        language: 'Idioma',
        viewProject: 'Ver proyecto',
        creator: 'Creador / responsable',
        projectFallback: 'Proyecto',
        underConstruction: 'Página en construcción',
        myProjects: 'Mis proyectos',
        managedProjects: 'Proyectos que administro',
        thirdPartyProjects: 'Proyectos de terceras partes',
        filter: 'Filtrar',
        allLabels: 'Todos los labels',
        defaultView: 'Por propiedad',
        byCategory: 'Por categoría',
        texts: 'Textos',
        collections: 'Colecciones',
        network: 'Redes',
        archaeologicalSites: 'Yacimientos arqueológicos'
    },
    gl: {
        language: 'Idioma',
        viewProject: 'Ver proxecto',
        creator: 'Creador / responsable',
        projectFallback: 'Proxecto',
        underConstruction: 'Páxina en construción',
        myProjects: 'Os meus proxectos',
        managedProjects: 'Proxectos que administro',
        thirdPartyProjects: 'Proxectos de terceiros',
        filter: 'Filtrar',
        allLabels: 'Todas as etiquetas',
        defaultView: 'Por propiedade',
        byCategory: 'Por categoría',
        texts: 'Textos',
        collections: 'Coleccións',
        network: 'Redes',
        archaeologicalSites: 'Xacementos arqueolóxicos'
    }
};

const PROJECT_DESCRIPTIONS: Record<string, Partial<Record<Exclude<Language, 'rly'>, string>>> = {
    'osiris-spelling-software': {
        es: 'Herramienta de investigación que permite consultar y comparar las grafías del nombre de Osiris en los Textos de los Sarcófagos del Reino Medio.',
        gl: 'Ferramenta de investigación que permite consultar e comparar as grafías do nome de Osiris nos Textos dos Sarcófagos do Reino Medio.'
    }
};

const RLYEHIAN_TRANSLATIONS: Record<TranslationKey, string> = {
    language: 'Y’hah',
    viewProject: 'Lloig mgep',
    creator: 'Ahf’ y’ geb',
    projectFallback: 'Mgep',
    underConstruction: 'Nilgh’ri',
    myProjects: 'Ya mgep',
    managedProjects: 'Mgep ya geb',
    thirdPartyProjects: 'N’ghft mgep',
    filter: 'Sll’ha',
    allLabels: 'Sll’ha nafl',
    defaultView: 'Y’bthnk',
    byCategory: 'N’ghft',
    texts: 'Y’hah kadishtu',
    collections: 'Nafl phlegeth',
    network: 'Shugg wgah',
    archaeologicalSites: 'Kadath nglui'
};

const RLYEHIAN_LEXICON: Record<string, string> = {
    cthulhu: 'Cthulhu',
    project: 'mgep',
    projects: 'mgep’na',
    research: 'kadishtu',
    tool: 'sll’ha',
    name: 'ahf’',
    texts: 'y’hah',
    text: 'y’hah',
    creator: 'ahf’ y’ geb',
    github: 'Y’git-hub',
    network: 'shugg wgah',
    collections: 'nafl phlegeth',
    collection: 'phlegeth'
};

const RLYEHIAN_PREFIXES = ['ph', 'ng', 'mglw', 'cth', 'r', 'wgah', 'fht', 'y', 'sll', 'zhro', 'kth', 'gh'];
const RLYEHIAN_CORES = ['lui', 'nafh', 'agl', 'eh', 'oth', 'ul', 'ai', 'yar', 'og', 'ath', 'or', 'ugg'];
const RLYEHIAN_SUFFIXES = ['nagl', 'fhtagn', 'nafh', 'lui', 'oth', 'eh', 'agl', 'og', 'yar', 'cth', 'ng', 'az'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
    private readonly document = inject(DOCUMENT);

    readonly language = signal<Language>('en');
    readonly options: readonly LanguageOption[] = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'gl', name: 'Galego' },
        { code: 'rly', name: 'R’lyehian' }
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

        if (language === 'rly') {
            return RLYEHIAN_TRANSLATIONS[key];
        }

        return TRANSLATIONS[language][key];
    }

    projectDescription(projectId: string, fallback: string): string {
        const language = this.language();

        if (language === 'rly') {
            return this.toRlyehian(fallback);
        }

        return PROJECT_DESCRIPTIONS[projectId]?.[language] ?? fallback;
    }

    content(value: string): string {
        return this.language() === 'rly' ? this.toRlyehian(value) : value;
    }

    private toRlyehian(value: string): string {
        return value.replace(/[\p{L}\p{N}]+/gu, word => this.rlyehianWord(word));
    }

    private rlyehianWord(word: string): string {
        const normalized = word.toLocaleLowerCase('en');
        const knownWord = RLYEHIAN_LEXICON[normalized];
        const translated = knownWord ?? this.generateRlyehianWord(normalized);

        return /^\p{Lu}/u.test(word)
            ? translated.charAt(0).toLocaleUpperCase('en') + translated.slice(1)
            : translated;
    }

    private generateRlyehianWord(word: string): string {
        let hash = 2166136261;

        for (const character of word) {
            hash = Math.imul(hash ^ (character.codePointAt(0) ?? 0), 16777619) >>> 0;
        }

        const prefix = RLYEHIAN_PREFIXES[hash % RLYEHIAN_PREFIXES.length];
        const core = RLYEHIAN_CORES[(hash >>> 8) % RLYEHIAN_CORES.length];
        const suffix = RLYEHIAN_SUFFIXES[(hash >>> 16) % RLYEHIAN_SUFFIXES.length];
        const separator = hash % 3 === 0 ? '’' : '';

        return `${prefix}${separator}${core}${suffix}`;
    }
}