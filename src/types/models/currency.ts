export type FiatCurrencyCode = 'USD' | 'EUR' | 'PLN';

type CryptoCurrencyCode = 'USDT' | 'USDC' | 'BUSD' | 'BTC' | 'ETH' | 'XRP';

type CurrencyCode = FiatCurrencyCode | CryptoCurrencyCode;

export interface Currency {
  code: CurrencyCode;
  is_fiat: boolean;
}

export interface CurrencyRate {
  from: CryptoCurrencyCode;
  to: FiatCurrencyCode;
  rate: string;
  percent_change_24h: string;
  last_updated: string;
}

export interface CurrencyRatesParams {
  currency_code: FiatCurrencyCode;
}
