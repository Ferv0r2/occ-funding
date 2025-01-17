import { NextResponse } from 'next/server';
import { ProjectStatus } from '@/constants/project-config';
import type { IProjectDetail } from '@/types/project/IProjectDetail';

// This would typically come from a database
const projectDetails: IProjectDetail = {
  id: '1',
  title: 'AI-Powered Healthcare Assistant',
  description: 'Revolutionizing patient care with AI.',
  bannerImage: '/banners/example_banner.webp',
  projectDetailDescription:
    "Our project aims to develop an intelligent healthcare assistant that can provide personalized medical advice, monitor patient health in real-time, and assist healthcare professionals in diagnosis and treatment planning. By leveraging the latest advancements in artificial intelligence and machine learning, we're creating a tool that will significantly improve patient outcomes and reduce the workload on healthcare providers.",
  fundingGoal: 500000,
  currentFunding: 350000,
  backers: 1500,
  status: ProjectStatus.InProgress,
  createdAt: new Date('2024-03-01').toISOString(),
  expiredAt: new Date('2025-09-01').toISOString(),
  milestones: [
    { title: 'Prototype Development', completed: true },
    { title: 'Clinical Trials', completed: false },
    { title: 'FDA Approval', completed: false },
    { title: 'Market Launch', completed: false },
  ],
  creator: {
    name: 'Dr. Jane Smith',
    profileImage: 'https://avatars.githubusercontent.com/u/78407912?v=4',
    bio: 'Experienced healthcare professional with a passion for integrating AI into medical practices.',
    projectsCreated: 3,
    successfulProjects: 2,
  },
  risks:
    "As with any healthcare technology, there are regulatory hurdles we must overcome. We're working closely with legal experts to ensure compliance with all relevant laws and regulations. Additionally, we're aware of the importance of data privacy and security in healthcare, and we're implementing state-of-the-art measures to protect patient information.",
  updates: [
    {
      date: '2023-05-01',
      title: 'Prototype Successfully Tested',
      content:
        "We're excited to announce that our AI Healthcare Assistant prototype has passed initial testing with flying colors. The system demonstrated a 95% accuracy rate in providing medical advice, which is a significant milestone for our project.",
    },
    {
      date: '2023-04-15',
      title: 'Partnership with Local Hospital',
      content:
        "We've secured a partnership with City General Hospital for our upcoming clinical trials. This collaboration will provide us with valuable real-world data and feedback from healthcare professionals.",
    },
  ],
};

export async function GET(
  request: Request,
  context: { params: { id: string } },
) {
  console.log('Request url', request.url);
  const params = await context.params;

  if (!params.id) {
    return NextResponse.json(
      { error: 'Project ID is required' },
      { status: 400 },
    );
  }

  console.log('Project found:', projectDetails);
  return NextResponse.json(projectDetails);
}
