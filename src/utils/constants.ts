import type { CurrencyIcon } from '@/types/assets/icons';
import type { Blockchain, CryptocurrencyCode, TokenCode } from '@/types/models/wallet';

export const BLOCKCHAINS: Record<
  Blockchain,
  {
    key: Blockchain;
    name: string;
    currency_code: CryptocurrencyCode;
    decimals: number;
    icon: CurrencyIcon;
    tokens: Record<
      TokenCode,
      { key: TokenCode; name: string; decimals: number; icon: CurrencyIcon }
    >;
  }
> = {
  ethereum: {
    key: 'ethereum',
    name: 'Ethereum',
    currency_code: 'ETH',
    decimals: 18,
    icon: 'eth',
    tokens: {
      USDT: {
        key: 'USDT',
        name: 'USDT (ERC-20)',
        decimals: 6,
        icon: 'usdt',
      },
    },
  },
};
