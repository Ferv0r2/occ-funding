import { NextResponse } from 'next/server';
import { ProjectStatus } from '@/constants/project-config';
import type { IProject } from '@/types/project/IProject';

// Handler for GET requests
export async function GET() {
  const response: IProject[] = [
    {
      id: '1',
      title: 'AI-Powered Healthcare Assistant',
      description: 'Revolutionizing patient care with AI',
      fundingGoal: 500000,
      currentFunding: 350000,
      status: ProjectStatus.InProgress,
      createdAt: new Date('2023-01-15').toISOString(),
      expiredAt: new Date('2023-07-15').toISOString(),
    },
    {
      id: '2',
      title: 'Sustainable Urban Farming Solution',
      description: 'Bringing agriculture to city centers',
      fundingGoal: 200000,
      currentFunding: 50000,
      status: ProjectStatus.NotStarted,
      createdAt: new Date('2023-03-01').toISOString(),
      expiredAt: new Date('2023-09-01').toISOString(),
    },
    {
      id: '3',
      title: 'Quantum Computing for All',
      description: 'Making quantum computing accessible',
      fundingGoal: 1000000,
      currentFunding: 750000,
      status: ProjectStatus.InProgress,
      createdAt: new Date('2023-02-10').toISOString(),
      expiredAt: new Date('2023-08-10').toISOString(),
    },
    {
      id: '4',
      title: 'Ocean Plastic Cleanup Drones',
      description: 'Autonomous drones for ocean cleanup',
      fundingGoal: 300000,
      currentFunding: 300000,
      status: ProjectStatus.Completed,
      createdAt: new Date('2023-01-01').toISOString(),
      expiredAt: new Date('2023-07-01').toISOString(),
    },
    {
      id: '5',
      title: 'Virtual Reality Education Platform',
      description: 'Immersive learning experiences',
      fundingGoal: 400000,
      currentFunding: 200000,
      status: ProjectStatus.InProgress,
      createdAt: new Date('2023-04-05').toISOString(),
      expiredAt: new Date('2023-10-05').toISOString(),
    },
    {
      id: '6',
      title: 'Renewable Energy Storage Breakthrough',
      description: 'Next-gen batteries for green energy',
      fundingGoal: 750000,
      currentFunding: 500000,
      status: ProjectStatus.InProgress,
      createdAt: new Date('2023-03-20').toISOString(),
      expiredAt: new Date('2023-09-20').toISOString(),
    },
    {
      id: '7',
      title: 'Biodegradable Packaging Innovation',
      description: 'Eco-friendly packaging solutions',
      fundingGoal: 150000,
      currentFunding: 25000,
      status: ProjectStatus.NotStarted,
      createdAt: new Date('2023-05-01').toISOString(),
      expiredAt: new Date('2023-11-01').toISOString(),
    },
  ];

  return NextResponse.json(response);
}
