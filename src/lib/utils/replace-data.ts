/**
 * Shrinks the Solana wallet address to format like 'abc1...xyz9'
 *
 * @param address Solana wallet address
 * @returns {string} shortened address
 */
export const replaceAddress = (address?: string): string => {
  if (!address || address.length < 10) return address || '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
