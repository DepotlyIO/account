export type Blockchain = 'ethereum';
export type CryptocurrencyCode = 'ETH';
export type TokenCode = 'USDT';
export type CryptocurrencyOrTokenCode = CryptocurrencyCode | TokenCode;

export interface WalletBalance {
  type: 'cryptocurrency' | 'token';
  name: string;
  currency_code: CryptocurrencyOrTokenCode;
  decimals: number;
  balance: string;
}

export interface Wallet {
  id: number;
  blockchain: Blockchain;
  account_index: number;
  address: string;
  balances: WalletBalance[];
}

export interface WalletCreateData {
  wallet: {
    blockchain: Blockchain;
  };
}
