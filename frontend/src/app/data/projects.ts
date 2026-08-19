import { Project, ProjectCategory, ProjectLabel } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'osiris-spelling-software',
    category: ProjectCategory.MyProjects,
    labels: [ProjectLabel.Texts, ProjectLabel.ArchaeologicalSites],
    name: 'Osiris Spelling Software',
    description: 'Research tool which allows you to check and compare the spellings of the name of Osiris in the Middle Kingdom Coffin Texts.',
    creator: 'César Guerra',
    creatorLink: '/about',
    githubUrl: 'https://github.com/csrgrr/Osiris-Spelling-Software',
    webUrl: 'https://csrgrr.com/osiris-spelling-software',
    image: 'assets/projects/OSS.png',
    technologies: [],
    year: 2026
  },
  {
    id: 'mdc-to-unicode',
    category: ProjectCategory.MyProjects,
    labels: [ProjectLabel.Texts],
    name: 'MdCToUnicode Converter Online',
    description: 'Tridirectional Egyptian hieroglyphs conversor library and online website (unicode, unicode_code and MdC).',
    creator: 'César Guerra',
    creatorLink: '/about',
    githubUrl: 'https://github.com/csrgrr/MdCToUnicode',
    webUrl: 'https://csrgrr.github.io/pages/projects/projectsOnline/MdcToUnicode.html',
    image: 'assets/projects/mdc-uni.png',
    technologies: [],
    year: 2026
  },
  {
    id: 'ocr-pt-ct',
    category: ProjectCategory.Team,
    labels: [ProjectLabel.Texts],
    name: 'OCR-PT-CT Project',
    description: 'Optical Character Recognition tool for processing texts from the Middle Kingdom Coffin Texts.',
    creator: 'Universidad de Alcalá',
    creatorLink: 'https://www.uah.es',
    webUrl: 'https://www.mortexvar.com/ocr-pt-ct',
    image: 'assets/projects/OCR.png',
    technologies: ['Swift', 'Python'],
    year: 2022
  },
  {
    id: 'ttae',
    category: ProjectCategory.Team,
    labels: [ProjectLabel.Texts],
    name: 'TTAE project',
    description: 'Continues the OCR-PT-CT project towards implementing a digital toolset to link OCR with transliteration through transcription in a semi-automatic manner.',
    creator: 'Universidad de Alcalá',
    creatorLink: 'https://www.uah.es',
    webUrl: 'https://www.mortexvar.com/ttae-project',
    image: 'assets/projects/OCR.png',
    technologies: ['Swift', 'Python'],
    year: 2024
  },
  {
    id: 'jsesh',
    category: ProjectCategory.ThirdParty,
    labels: [ProjectLabel.Texts],
    name: 'JSESH',
    description: 'The main word processor for ancient Egyptian hieroglyphic texts, used in many professional egyptological publications',
    creator: 'Serge Rosmorduc',
    creatorLink: 'https://github.com/rosmord',
    githubUrl: 'https://github.com/rosmord/jsesh',
    webUrl: 'https://jsesh.qenherkhopeshef.org/',
    image: 'assets/projects/jsesh.svg',
    technologies: [],
    year: 2026
  }
];