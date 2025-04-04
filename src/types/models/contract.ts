import type { CryptoCurrencyCode } from '@/types/models/currency';
import type { RequestNetworkContract } from '@/types/models/request-network-contract';

export enum ContractStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  REVOKED = 'revoked',
}

export enum RecurrenceType {
  NON_RECURRENT = 'non_recurrent',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export interface Contract {
  id: number;
  request_network_contracts: RequestNetworkContract[];
  user_id: number;
  name: string;
  identification_number: string;
  country: string;
  city: string;
  address: string;
  region: string;
  zip: string;
  invoice_number: string;
  payee_wallet_address: string;
  status: ContractStatus;
  payment_amount: string;
  currency_code: CryptoCurrencyCode;
  due_date: string | null;
  recurrence_type: RecurrenceType;
  recurrence_day: number | null;
  created_at: string;
  updated_at: string;
  contract_wallet_id: number | null;
}

export interface ContractData {
  contract: {
    name: string;
    identification_number: string;
    country: string;
    region: string;
    city: string;
    address: string;
    zip: string;
    invoice_number: string;
    payee_wallet_address: string;
    payment_amount: string;
    currency_code: string;
    due_date: string;
    recurrence_type: RecurrenceType;
    recurrence_day: number;
  };
}

export interface AssignWalletData {
  wallet: {
    id: number;
  };
}

export interface AssignWalletResponse {
  contract_wallet_id: number;
}
