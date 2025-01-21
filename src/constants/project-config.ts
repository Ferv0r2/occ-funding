export const ITEMS_PER_PAGE = 6;
export const MAX_FILE_SIZE = 5000000; // 5MB
export const TOAST_DURATION_MS = 3000;

export enum ProjectStatus {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Completed = 'completed',
}

export enum ProjectSortBy {
  FundingPercentage = 'funding_percentage',
  MostFunded = 'most_funded',
  Newest = 'newest',
  EndingSoon = 'ending_soon',
}

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
