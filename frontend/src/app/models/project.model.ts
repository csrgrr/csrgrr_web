export enum ProjectCategory {
  MyProjects = 'my-projects',
  Management = 'management',
  Team = 'team',
  ThirdParty = 'third-party'
}

export enum ProjectLabel {
  Texts = 'texts',
  Collections = 'collections',
  Network = 'network',
  ArchaeologicalSites = 'archaeologicalSites'
}

export interface Project {
  id: string;
  category: ProjectCategory;
  labels: ProjectLabel[];
  name?: string;
  description?: string;
  creator?: string;
  creatorLink?: string;

  githubUrl?: string;
  webUrl?: string;

  image?: string;
  technologies?: string[];
  year?: number;
}