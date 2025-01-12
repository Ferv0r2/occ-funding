export const ITEMS_PER_PAGE = 6;

export enum ProjectStatus {
  ALL = 'all',
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Completed = 'completed',
}

export enum ProjectSortBy {
  Default = 'default',
  FundingPercentage = 'funding_percentage',
  MostFunded = 'most_funded',
  Newest = 'newest',
  EndingSoon = 'ending_soon',
}
