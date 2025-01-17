/**
 * Shrinks the address to 0x...0000 format
 *
 * @param str wallet address
 * @param prefix prefix of the address default is '0x'
 * @returns {string} replaced address
 */
export const replaceAddress = (str: string, prefix: string = '0x'): string => {
  if (!str || str?.length < 10) return str;
  return str.replace(/0x[a-fA-F0-9]{6,}/g, (address) => {
    return `${prefix}${address.slice(2, 6)}...${address.slice(-4)}`;
  });
};
