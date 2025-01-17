import type { IProject } from './IProject';

export type IProjectDetail = IProject & {
  projectDetailDescription: string;
  backers: number;
  milestones: { title: string; completed: boolean }[];
  creator: {
    name: string;
    profileImage: string;
    bio: string;
    projectsCreated: number;
    successfulProjects: number;
  };
  risks: string;
  updates: { date: string; title: string; content: string }[];
};
