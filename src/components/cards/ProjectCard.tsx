import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from '@/i18n/routing';
import { formatCurrency } from '@/lib/utils/format-data';
import type { IProject } from '@/types/project/IProject';

interface ProjectCardProps {
  project: IProject;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const t = useTranslations('Project');
  const progress = (project.currentFunding / project.fundingGoal) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {project.bannerImage ? (
          <Image
            src={project.bannerImage || ''}
            height={400}
            width={600}
            alt={project.title || 'Project banner'}
            className="w-full rounded-lg"
          />
        ) : (
          <div className="mb-2 h-64 w-full rounded-lg bg-gray-300" />
        )}
        <p className="mb-4 text-sm text-muted-foreground">
          {project.description}
        </p>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm font-medium">
          {t('raised_of', {
            current: formatCurrency(project.currentFunding),
            goal: formatCurrency(project.fundingGoal),
          })}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/projects/${project.id}`} className="w-full">
          <Button className="w-full">{t('view_project')}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
