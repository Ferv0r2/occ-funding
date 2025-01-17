import dayjs from 'dayjs';

/**
 * Calculate the days left from the given date
 *
 * @param date ISO date string
 * @returns {number} days left
 */
export const getDaysLeft = (date: string): number => {
  return Math.max(0, dayjs(date).diff(dayjs(), 'day'));
};
