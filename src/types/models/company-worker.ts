import type { CryptoCurrencyCode } from '@/types/models/currency';

export type CompanyWorkerStatus = 'revoked' | 'permanent' | 'temporary';

export interface CompanyWorkerUser {
  name: string;
}

export interface CompanyWorker {
  id: number;
  company_id: number;
  email: string;
  name: string;
  accepted: boolean;
  status: CompanyWorkerStatus;
  payment_amount: string | null;
  currency_code: CryptoCurrencyCode | null;
  user: CompanyWorkerUser | null;
}
