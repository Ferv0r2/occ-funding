'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import type { IProject } from '@/types/project/IProject';

const fetchProjects = async (): Promise<IProject[]> => {
  const res = await fetch('/api/projects');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

type ProjectsGridProps = {
  title: string;
  projects: IProject[];
  isLoading: boolean;
};

function ProjectsGrid({ title, projects, isLoading }: ProjectsGridProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-16 lg:py-24">
      <h1 className="mb-12 text-center text-4xl font-bold">{title}</h1>
      {isLoading ? (
        <div>
          {title === 'hot_projects'
            ? 'Loading projects...'
            : 'Loading projects...'}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const t = useTranslations('Home');

  const { isLoading: isProjectsLoading, data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const hotProjects = [...projects]
    .sort((a, b) => b.currentFunding - a.currentFunding)
    .slice(0, 3);

  const nearingEndProjects = [...projects]
    .sort((a, b) => dayjs(a.expiredAt).unix() - dayjs(b.expiredAt).unix())
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <section className="w-full bg-gradient-to-b from-primary/5 to-primary/10 py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              {t('description')}
            </p>
            <div className="space-x-4">
              <Link href="/projects">
                <Button size="lg">
                  {t('explorer_projects')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline">
                  {t('start_project')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProjectsGrid
        title={t('hot_projects')}
        projects={hotProjects}
        isLoading={isProjectsLoading}
      />

      <ProjectsGrid
        title={t('nearing_end_projects')}
        projects={nearingEndProjects}
        isLoading={isProjectsLoading}
      />

      <section className="w-full bg-gradient-to-t from-primary/5 to-primary/10 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('join_funding')}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              {t('join_funding_sub')}
            </p>
            <Link href="/signup">
              <Button size="lg">
                {t('get_start')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
