import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

export type Language = 'en' | 'es' | 'gl' | 'pt' | 'rly';
export type TranslationKey =
    | 'language'
    | 'viewProject'
    | 'creator'
    | 'projectFallback'
    | 'underConstruction'
    | 'myProjects'
    | 'managedProjects'
    | 'teamProjects'
    | 'thirdPartyProjects'
    | 'filter'
    | 'allLabels'
    | 'defaultView'
    | 'byCategory'
    | 'texts'
    | 'collections'
    | 'network'
    | 'archaeologicalSites'
    | 'about'
    | 'aboutRole'
    | 'aboutIntro'
    | 'aboutBody'
    | 'contact'
    | 'email'
    | 'profileLinks'
    | 'projects';

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
        teamProjects: 'Part of the team',
        thirdPartyProjects: 'Third-party projects',
        filter: 'Filter',
        allLabels: 'All labels',
        defaultView: 'Default',
        byCategory: 'By category',
        texts: 'Texts',
        collections: 'Collections',
        network: 'Network',
        archaeologicalSites: 'Archaeological sites',
        about: 'About',
        aboutRole: 'Digital Egyptologist & web developer',
        aboutIntro: 'Throughout my career, I have had the opportunity to collaborate on several digital humanities initiatives and to develop projects of my own.',
        aboutBody: 'csrgrr.com was created to showcase my work developing digital research tools for Egyptology and the humanities. It also presents digital Egyptology projects that have accompanied my work as a researcher and developer.',
        contact: 'Contact',
        email: 'Email',
        profileLinks: 'Professional profiles',
        projects: 'Projects'
    },
    es: {
        language: 'Idioma',
        viewProject: 'Ver proyecto',
        creator: 'Creador / responsable',
        projectFallback: 'Proyecto',
        underConstruction: 'Página en construcción',
        myProjects: 'Mis proyectos',
        managedProjects: 'Proyectos que administro',
        teamProjects: 'Parte del equipo',
        thirdPartyProjects: 'Proyectos de terceras partes',
        filter: 'Filtrar',
        allLabels: 'Todos los labels',
        defaultView: 'Por defecto',
        byCategory: 'Por categoría',
        texts: 'Textos',
        collections: 'Colecciones',
        network: 'Redes',
        archaeologicalSites: 'Yacimientos arqueológicos',
        about: 'Acerca de',
        aboutRole: 'Egiptólogo digital y desarrollador web',
        aboutIntro: 'A lo largo de mi carrera he tenido la oportunidad de colaborar en diversas iniciativas centradas en las humanidades digitales, además de desarrollar proyectos propios.',
        aboutBody: 'csrgrr.com nace con el objetivo de reunir mi trabajo como desarrollador de herramientas digitales de investigación aplicadas a la egiptología y las humanidades. También presenta proyectos de egiptología digital que han acompañado mi trayectoria como investigador y desarrollador.',
        contact: 'Contacto',
        email: 'Correo electrónico',
        profileLinks: 'Perfiles profesionales',
        projects: 'Proyectos'
    },
    gl: {
        language: 'Idioma',
        viewProject: 'Ver proxecto',
        creator: 'Creador / responsable',
        projectFallback: 'Proxecto',
        underConstruction: 'Páxina en construción',
        myProjects: 'Os meus proxectos',
        managedProjects: 'Proxectos que administro',
        teamProjects: 'Parte do equipo',
        thirdPartyProjects: 'Proxectos de terceiros',
        filter: 'Filtrar',
        allLabels: 'Todas as etiquetas',
        defaultView: 'Por defecto',
        byCategory: 'Por categoría',
        texts: 'Textos',
        collections: 'Coleccións',
        network: 'Redes',
        archaeologicalSites: 'Xacementos arqueolóxicos',
        about: 'Sobre',
        aboutRole: 'Exiptólogo dixital e desarrollador web',
        aboutIntro: 'Ao longo da miña carreira tiven a oportunidade de colaborar en diversas iniciativas centradas nas humanidades dixitais, ademais de desenvolver proxectos propios.',
        aboutBody: 'csrgrr.com nace para reunir o meu traballo como desarrollador de ferramentas dixitais de investigación aplicadas á exiptoloxía e ás humanidades. Tamén presenta proxectos de exiptoloxía dixital que acompañaron a miña traxectoria como investigador e desarrollador.',
        contact: 'Contacto',
        email: 'Correo electrónico',
        profileLinks: 'Perfís profesionais',
        projects: 'Proxectos'
    },
    pt: {
        language: 'Idioma',
        viewProject: 'Ver projeto',
        creator: 'Criador / responsável',
        projectFallback: 'Projeto',
        underConstruction: 'Página em construção',
        myProjects: 'Os meus projetos',
        managedProjects: 'Projetos que administro',
        teamProjects: 'Parte da equipa',
        thirdPartyProjects: 'Projetos de terceiros',
        filter: 'Filtrar',
        allLabels: 'Todas as etiquetas',
        defaultView: 'Por defeito',
        byCategory: 'Por categoria',
        texts: 'Textos',
        collections: 'Coleções',
        network: 'Redes',
        archaeologicalSites: 'Sítios arqueológicos',
        about: 'Sobre',
        aboutRole: 'Egiptólogo digital e desenvolvedor web',
        aboutIntro: 'Ao longo da minha carreira, tive a oportunidade de colaborar em diversas iniciativas centradas nas humanidades digitais, além de desenvolver projetos próprios.',
        aboutBody: 'csrgrr.com nasceu para reunir o meu trabalho como desenvolvedor de ferramentas digitais de investigação aplicadas à egiptologia e às humanidades. Apresenta também projetos de egiptologia digital que acompanharam o meu percurso como investigador e desarrollador.',
        contact: 'Contacto',
        email: 'Correio eletrónico',
        profileLinks: 'Perfis profissionais',
        projects: 'Projetos'
    }
};

const PROJECT_DESCRIPTIONS: Record<string, Partial<Record<Exclude<Language, 'rly'>, string>>> = {
    'osiris-spelling-software': {
        es: 'Herramienta de investigación que permite consultar y comparar las grafías del nombre de Osiris en los Textos de los Sarcófagos del Reino Medio.',
        gl: 'Ferramenta de investigación que permite consultar e comparar as grafías do nome de Osiris nos Textos dos Sarcófagos do Reino Medio.',
        pt: 'Ferramenta de investigação que permite consultar e comparar as grafias do nome de Osíris nos Textos dos Sarcófagos do Império Médio.'
    },
    'mdc-to-unicode': {
        es: 'Biblioteca y aplicación web para convertir jeroglíficos egipcios de forma tridireccional entre Unicode, código Unicode y MdC.',
        gl: 'Biblioteca e aplicación web para converter xeroglíficos exipcios de forma tridireccional entre Unicode, código Unicode e MdC.',
        pt: 'Biblioteca e aplicação web para converter hieróglifos egípcios de forma tridirecional entre Unicode, código Unicode e MdC.'
    },
    'ocr-pt-ct': {
        es: 'Herramienta de reconocimiento óptico de caracteres para procesar textos de los Textos de los Sarcófagos del Reino Medio.',
        gl: 'Ferramenta de recoñecemento óptico de caracteres para procesar textos dos Textos dos Sarcófagos do Reino Medio.',
        pt: 'Ferramenta de reconhecimento ótico de caracteres para processar textos dos Textos dos Sarcófagos do Império Médio.'
    },
    ttae: {
        es: 'Continuación del proyecto OCR-PT-CT orientada a implementar un conjunto de herramientas digitales que conecte de forma semiautomática el reconocimiento óptico de caracteres con la transliteración mediante la transcripción.',
        gl: 'Continuación do proxecto OCR-PT-CT orientada a implementar un conxunto de ferramentas dixitais que conecte de forma semiautomática o recoñecemento óptico de caracteres coa transliteración mediante a transcrición.',
        pt: 'Continuação do projeto OCR-PT-CT orientada para a implementação de um conjunto de ferramentas digitais que ligue de forma semiautomática o reconhecimento ótico de caracteres à transliteração através da transcrição.'
    },
    jsesh: {
        es: 'El principal procesador de textos jeroglíficos del antiguo Egipto, utilizado en numerosas publicaciones egiptológicas profesionales.',
        gl: 'O principal procesador de textos xeroglíficos do antigo Exipto, utilizado en numerosas publicacións exiptolóxicas profesionais.',
        pt: 'O principal processador de textos hieroglíficos do antigo Egito, utilizado em numerosas publicações egiptológicas profissionais.'
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
    teamProjects: 'Mgep ya ahf’',
    thirdPartyProjects: 'N’ghft mgep',
    filter: 'Sll’ha',
    allLabels: 'Sll’ha nafl',
    defaultView: 'Y’bthnk',
    byCategory: 'N’ghft',
    texts: 'Y’hah kadishtu',
    collections: 'Nafl phlegeth',
    network: 'Shugg wgah',
    archaeologicalSites: 'Kadath nglui',
    about: 'Y’bthnk ahf’',
    aboutRole: 'Kadishtu Khem mgep’ geb',
    aboutIntro: 'Ya ahf’ kadishtu geb, wgah’na y’hah Khem phlegeth nilgh’ri.',
    aboutBody: 'Ya geb sll’ha mgep nafl y’hah Khem, phlegeth kadishtu wgah lloig fhtagn.',
    contact: 'Wgah ahf’',
    email: 'Y’hah wgah',
    profileLinks: 'Ahf’ wgah’na',
    projects: 'Mgep’na'
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

    readonly language = signal<Language>(this.detectBrowserLanguage());
    readonly options: readonly LanguageOption[] = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'gl', name: 'Galego' },
        { code: 'pt', name: 'Português' },
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

    private detectBrowserLanguage(): Language {
        const navigator = this.document.defaultView?.navigator;
        const preferredLanguages = navigator?.languages.length
            ? navigator.languages
            : [navigator?.language ?? 'en'];

        for (const locale of preferredLanguages) {
            const language = locale.toLocaleLowerCase('en').split('-')[0];

            if (language === 'en' || language === 'es' || language === 'gl' || language === 'pt') {
                return language;
            }
        }

        return 'en';
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