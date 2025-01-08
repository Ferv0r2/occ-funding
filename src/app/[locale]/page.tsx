'use client';

import { useQuery } from '@tanstack/react-query';
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

export default function Home() {
  const t = useTranslations('Home');

  const { isLoading: isProjectsLoading, data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_20px] items-center justify-items-center gap-16 pb-20 font-[family-name:var(--font-geist-sans)]">
      <section className="w-full bg-gradient-to-b from-primary/5 to-primary/10 py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
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
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-3xl font-bold">{t('hot_projects')}</h1>
        {isProjectsLoading ? (
          <div>{t('loading_project')}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
