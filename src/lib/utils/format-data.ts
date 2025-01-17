/**
 * Formatting the currency based on the locale.
 * Currently, this function is only used in the USD currency format.
 *
 * @param amount number
 * @returns {string} formatted currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formatting the decimal based on the locale.
 *
 * @param amount number
 * @returns {string} formatted decimal
 */
export const formatDecimal = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
