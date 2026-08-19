export enum ProjectCategory {
  MyProjects = 'my-projects',
  Management = 'management',
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

  githubUrl?: string;
  webUrl?: string;

  image?: string;
  technologies?: string[];
  year?: number;
}