import type { CryptoCurrencyCode } from '@/types/models/currency';
import type { BlockchainContract } from '@/types/models/blockchain-contract';

export enum CompanyContractStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  REVOKED = 'revoked',
}

export interface CompanyContract {
  id: number;
  company_id: number;
  blockchain_contracts: BlockchainContract[];
  user_id: number;
  name: string;
  identification_number: string;
  country: string;
  city: string;
  address: string;
  zip: string;
  invoice_number: string;
  wallet: string;
  recurrent: boolean;
  status: CompanyContractStatus;
  payment_amount: string;
  currency_code: CryptoCurrencyCode;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompanyContractData {
  company_contract: {
    name: string;
    identification_number: string;
    country: string;
    city: string;
    address: string;
    zip: string;
    invoice_number: string;
    wallet: string;
    payment_amount: string;
    currency_code: string;
    due_date: string;
    recurrent: boolean;
  };
}
