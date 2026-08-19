import { Project, ProjectCategory, ProjectLabel } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'osiris-spelling-software',
    category: ProjectCategory.MyProjects,
    labels: [ProjectLabel.Texts, ProjectLabel.Collections],
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
    id: 'osiris-spelling-software-management',
    category: ProjectCategory.Team,
    labels: [ProjectLabel.Network, ProjectLabel.Texts],
    name: 'Osiris Spelling Software',
    description: 'Research tool which allows you to check and compare the spellings of the name of Osiris in the Middle Kingdom Coffin Texts.',
    creator: 'César Guerra',
    githubUrl: 'https://github.com/...',
    webUrl: 'https://...',
    image: 'assets/projects/OSS.png',
    technologies: ['Swift', 'Python'],
    year: 2026
  },
  {
    id: 'osiris-spelling-software-third-party',
    category: ProjectCategory.ThirdParty,
    labels: [ProjectLabel.ArchaeologicalSites, ProjectLabel.Collections],
    name: 'Osiris Spelling Software',
    description: 'Research tool which allows you to check and compare the spellings of the name of Osiris in the Middle Kingdom Coffin Texts.',
    creator: 'César Guerra',
    githubUrl: 'https://github.com/...',
    webUrl: 'https://...',
    image: 'assets/projects/OSS.png',
    technologies: ['Swift', 'Python'],
    year: 2026
  }
];