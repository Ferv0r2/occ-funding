'use client';

import { useQuery } from '@tanstack/react-query';
import { CalendarDays, Users } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectStatus } from '@/constants/project-config';
import { getDaysLeft } from '@/lib/utils/calculate-data';
import { formatCurrency, formatDecimal } from '@/lib/utils/format-data';
import { IProjectDetail } from '@/types/project/IProjectDetail';

const fetchProjectDetail = async (id: string): Promise<IProjectDetail> => {
  const res = await fetch(`/api/projects/${id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const statusColorMap: Record<ProjectStatus, string> = {
  [ProjectStatus.NotStarted]: 'bg-yellow-500',
  [ProjectStatus.InProgress]: 'bg-blue-500',
  [ProjectStatus.Completed]: 'bg-green-500',
};

export default function ProjectPage() {
  const { id } = useParams();
  const t = useTranslations('Project');

  const { isLoading, data: projectInfo = null } = useQuery({
    queryKey: ['projects', id],
    queryFn: () => fetchProjectDetail(id as string),
    enabled: !!id,
  });

  if (isLoading || !projectInfo) {
    return <div className="mx-auto max-w-2xl py-8">{t('loading_project')}</div>;
  }

  const {
    title,
    description,
    bannerImage,
    projectDetailDescription,
    milestones,
    updates,
    risks,
    currentFunding,
    fundingGoal,
    backers,
    expiredAt,
    status,
    creator,
  } = projectInfo;

  const progress = (currentFunding / fundingGoal) * 100;
  const daysLeft = getDaysLeft(expiredAt);
  const statusColor = statusColorMap[status] || '';

  const {
    name: creatorName,
    profileImage: creatorProfileImage,
    projectsCreated: creatorProjectsCreated,
    bio,
    successfulProjects,
  } = creator;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-2 text-3xl">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
                <Badge className={statusColor}>{t(status)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Image
                src={bannerImage ?? ''}
                height={200}
                width={300}
                alt={title}
                className="mb-6 w-full max-w-2xl rounded-lg object-cover"
              />
              <Tabs defaultValue="story" className="w-full">
                <TabsList>
                  <TabsTrigger value="story">{t('story')}</TabsTrigger>
                  <TabsTrigger value="updates">{t('updates')}</TabsTrigger>
                  <TabsTrigger value="risks">{t('risks')}</TabsTrigger>
                </TabsList>
                <TabsContent value="story">
                  <p className="text-muted-foreground">
                    {projectDetailDescription}
                  </p>
                  <h3 className="mb-2 mt-4 text-lg font-semibold">
                    {t('project_milestones')}
                  </h3>
                  <ul className="space-y-2">
                    {milestones?.map((milestone, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={milestone.completed}
                          readOnly
                          className="h-4 w-4"
                        />
                        <span
                          className={milestone.completed ? 'line-through' : ''}
                        >
                          {milestone.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="updates">
                  {updates?.map((update, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold">{update.title}</h3>
                      <p className="mb-2 text-sm text-muted-foreground">
                        {new Date(update.date).toLocaleDateString()}
                      </p>
                      <p>{update.content}</p>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="risks">
                  <p className="text-muted-foreground">{risks}</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Progress value={progress} className="mb-2 h-2" />
                  <div className="flex text-sm">
                    {t('raised_of', {
                      current: formatCurrency(currentFunding),
                      goal: formatCurrency(fundingGoal),
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>
                      {t('backers_count', {
                        count: formatDecimal(backers),
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    <span>
                      {t('days_left', {
                        days: formatDecimal(daysLeft),
                      })}
                    </span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  {t('back_project')}
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('project_creator')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={creatorProfileImage} alt={creatorName} />
                  <AvatarFallback>{creatorName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{creatorName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {creatorProjectsCreated} projects created
                  </p>
                </div>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">{bio}</p>
              <div className="flex justify-between text-sm">
                <span>
                  {t('created_count', {
                    count: formatDecimal(creatorProjectsCreated),
                  })}
                </span>
                <span>
                  {t('successful_count', {
                    count: formatDecimal(successfulProjects),
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
