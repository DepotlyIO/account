import type { FiatCurrencyCode } from '@/types/models/currency';

type AccountType = 'employee' | 'regular';

export enum ProfileStatus {
  UNVERIFIED = 'unverified',
  VERIFYING = 'verifying',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export enum ProfileType {
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
}

export interface Profile {
  status: ProfileStatus;
  profile_type: ProfileType;
  name: string | null;
  identification_number: string | null;
  email: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  zip: string | null;
  address: string | null;
  updated_at: string;
}

export interface ProfileUpdateRequest {
  profile: {
    profile_type: ProfileType;
    name: string;
    identification_number: string;
    email: string;
    country: string;
    city: string;
    region: string;
    zip: string;
    address: string;
  };
}

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
  profile: Profile;
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
