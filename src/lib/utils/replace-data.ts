export const replaceAddress = (str: string, prefix: string = '0x') => {
  if (!str || str?.length < 10) return str;
  return str.replace(/0x[a-fA-F0-9]{6,}/g, (address) => {
    return `${prefix}${address.slice(2, 6)}...${address.slice(-4)}`;
  });
};
