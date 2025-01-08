import { NextResponse } from 'next/server';
import type { IProject } from '@/types/project/IProject';

// Handler for GET requests
export async function GET() {
  const response: IProject[] = [
    {
      id: '1',
      title: 'Project A',
      description: 'A revolutionary blockchain project',
      fundingGoal: 100000,
      currentFunding: 75000,
    },
    {
      id: '2',
      title: 'Project B',
      description: 'An innovative AI solution',
      fundingGoal: 50000,
      currentFunding: 30000,
    },
  ];

  return NextResponse.json(response);
}
