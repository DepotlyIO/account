import type { FiatCurrencyCode } from '@/types/models/currency';

type AccountType = 'employee' | 'regular' | 'company';

export interface User {
  id: number;
  name: string;
  email: string;
  is_email_verified: boolean;
  email_verification_sent_at: string | null;
  password_reset_sent_at: string | null;
  account_type: AccountType;
  is_account_verified: boolean;
  locale: string;
  currency_code: FiatCurrencyCode;
}

export interface UserCreateRequest {
  user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    locale: string;
  };
}

export interface EmailVerificationRequest {
  email_verification_token: string;
}
