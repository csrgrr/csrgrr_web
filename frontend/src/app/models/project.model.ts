export interface Project {
  id: string;
  name?: string;
  description?: string;
  creator?: string;

  githubUrl?: string;
  webUrl?: string;

  image?: string;
  technologies?: string[];
  year?: number;
}