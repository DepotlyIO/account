import type { CryptoCurrencyCode } from '@/types/models/currency';

export enum CompanyContractStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  REVOKED = 'revoked',
}

export interface CompanyContract {
  id: number;
  company_id: number;
  user_id: number;
  name: string;
  wallet: string;
  recurrent: boolean;
  status: CompanyContractStatus;
  payment_amount: string | null;
  currency_code: CryptoCurrencyCode | null;
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
  };
}
