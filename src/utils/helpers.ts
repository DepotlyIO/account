export const formatCryptocurrency = (
  code: string,
  amount: number | string,
  maximumFractionDigits = 2,
) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
    maximumFractionDigits,
  })
    .format(+amount)
    .replace('USD', code);
