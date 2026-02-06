export const extractPrice = (priceText: string): number => {
  return parseFloat(priceText.replace(/[^0-9.]/g, ''));
};
