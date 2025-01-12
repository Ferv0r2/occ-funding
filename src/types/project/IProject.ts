import type { ProjectStatus } from '@/constants/project-config';

export type IProject = {
  id: string;
  title: string;
  description: string;
  fundingGoal: number;
  currentFunding: number;
  status: ProjectStatus;
  createdAt: string;
  expiredAt: string;
};
