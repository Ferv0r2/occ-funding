'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useMemo, FC } from 'react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Pagination } from '@/components/separators/Pagination';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ITEMS_PER_PAGE,
  ProjectSortBy,
  ProjectStatus,
} from '@/constants/project-config';
import { IProject } from '@/types/project/IProject';

type StatusFilter = ProjectStatus | 'all';
type SortBy = ProjectSortBy | 'default';

const fetchProjects = async (): Promise<IProject[]> => {
  const res = await fetch('/api/projects');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const Filters: FC<{
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  sortBy: SortBy;
  onSortChange: (value: SortBy) => void;
}> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
}) => {
  const t = useTranslations('Project');

  return (
    <div className="mb-6 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="relative w-full max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
        />
        <Input
          type="text"
          placeholder={t('search_projects')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="flex space-x-4">
        <Select onValueChange={onStatusChange} value={statusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('filter_by_status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all_statuses')}</SelectItem>
            <SelectItem value={ProjectStatus.NotStarted}>
              {t('not_started')}
            </SelectItem>
            <SelectItem value={ProjectStatus.InProgress}>
              {t('in_progress')}
            </SelectItem>
            <SelectItem value={ProjectStatus.Completed}>
              {t('completed')}
            </SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={onSortChange} value={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('sort_by')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'default'}>{t('default_sort')}</SelectItem>
            <SelectItem value={ProjectSortBy.FundingPercentage}>
              {t('funding_percentage')}
            </SelectItem>
            <SelectItem value={ProjectSortBy.MostFunded}>
              {t('most_funded')}
            </SelectItem>
            <SelectItem value={ProjectSortBy.Newest}>{t('newest')}</SelectItem>
            <SelectItem value={ProjectSortBy.EndingSoon}>
              {t('ending_soonest')}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const t = useTranslations('Project');
  const { isLoading, data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('default');

  const sortFunctions = useMemo(
    () =>
      ({
        ['default']: () => 0,
        [ProjectSortBy.FundingPercentage]: (a, b) => {
          const percentageA = (a.currentFunding / a.fundingGoal) * 100;
          const percentageB = (b.currentFunding / b.fundingGoal) * 100;
          return percentageB - percentageA;
        },
        [ProjectSortBy.MostFunded]: (a, b) =>
          b.currentFunding - a.currentFunding,
        [ProjectSortBy.Newest]: (a, b) =>
          dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix(),
        [ProjectSortBy.EndingSoon]: (a, b) =>
          dayjs(a.expiredAt).unix() - dayjs(b.expiredAt).unix(),
      }) as Record<SortBy, (a: IProject, b: IProject) => number>,
    [],
  );

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesStatus =
          statusFilter === 'all' ? true : project.status === statusFilter;
        const matchesSearch = searchTerm
          ? project.title.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        return matchesStatus && matchesSearch;
      })
      .sort(sortFunctions[sortBy]);
  }, [projects, sortFunctions, sortBy, statusFilter, searchTerm]);

  const pageCount = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = currentPage * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, end);
  }, [filteredProjects, currentPage]);

  if (isLoading) {
    return <div>{t('loading_project')}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('explore_projects')}</h1>
      <Filters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
