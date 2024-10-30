export type FiatCurrencyCode = 'USD' | 'EUR' | 'PLN';

export type CryptoCurrencyCode = 'USDT' | 'USDC' | 'BUSD' | 'BTC' | 'ETH' | 'XRP';

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
  updated_at: string;
}

export interface CurrencyRatesParams {
  currency_code: FiatCurrencyCode;
}

export interface RequestNetworkCurrency {
  name: string;
  value: string;
  type: 'cryptocurrency' | 'token';
  decimals: number;
  params: {
    type: 'ETH' | 'ERC20';
    value: 'ETH' | string;
  };
}
