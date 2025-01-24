import dayjs from 'dayjs';
import { CalendarDays, Users, Target, Clock } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils/format-data';

interface ProjectPreviewProps {
  project: {
    title?: string;
    description?: string;
    fundingGoal?: number;
    startDate?: Date;
    endDate?: Date;
    bannerImage?: FileList;
  };
}

export function ProjectPreview({ project }: ProjectPreviewProps) {
  const t = useTranslations('Project');
  const { title, description, fundingGoal, startDate, endDate, bannerImage } =
    project;

  const daysLeft = endDate
    ? Math.max(0, dayjs(endDate).diff(dayjs(), 'day'))
    : 0;

  const previewImage =
    bannerImage && bannerImage.length > 0
      ? URL.createObjectURL(bannerImage[0])
      : '';

  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="list">{t('list_view')}</TabsTrigger>
        <TabsTrigger value="detail">{t('detail_view')}</TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{title || 'Project Title'}</CardTitle>
                <CardDescription className="mt-2">
                  {description || 'Project description will appear here.'}
                </CardDescription>
              </div>
              <Badge>{t('preview')}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={0} className="mb-2" />
            <p className="mb-2 text-sm font-medium">
              {t('raised_of', {
                current: 0,
                goal: formatCurrency(fundingGoal || 0),
              })}
            </p>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {t('days_left', {
                  days: daysLeft,
                })}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              {t('view_project')}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="detail">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="mb-2 text-3xl">
                  {title || 'Project Title'}
                </CardTitle>
                <CardDescription>
                  {description || 'Project description will appear here.'}
                </CardDescription>
              </div>
              <Badge>{t('preview')}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {previewImage ? (
              <Image
                src={previewImage || ''}
                height={400}
                width={600}
                alt={title || 'Project banner'}
                className="w-full rounded-lg"
              />
            ) : (
              <div className="h-64 w-full rounded-lg bg-gray-300" />
            )}
            <Progress value={0} className="mb-2 mt-6" />
            <p className="mb-2 text-lg font-medium">
              {t('raised_of', {
                current: formatCurrency(0),
                goal: fundingGoal ? formatCurrency(fundingGoal) : 'N/A',
              })}
            </p>
            <div className="mb-4 flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>
                  {t('backers_count', {
                    count: 0,
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>
                  {t('funding_goal', {
                    goal: fundingGoal ? formatCurrency(fundingGoal) : 'N/A',
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {daysLeft ? t('days_left', { days: daysLeft }) : 'N/A'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>
                  {startDate ? dayjs(startDate).format('MMM D, YYYY') : 'N/A'}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{t('about_project')}</h3>
              <p className="text-muted-foreground">
                {description || t('description_info_message')}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              {t('back_project')}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
