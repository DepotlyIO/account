import { isAxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type {
  Authentication,
  AuthenticationRequest,
  AuthenticationResponse,
} from '@/types/models/authentication';
import type { EmailVerificationRequest, User, UserCreateRequest } from '@/types/models/user';
import type { Currency, CurrencyRate, CurrencyRatesParams } from '@/types/models/currency';
import type { Company, CompanyData } from '@/types/models/company';
import type { CompanyWorker } from '@/types/models/company-worker';

export interface Api {
  authentication: {
    list: () => Promise<AxiosResponse<Authentication[]>>;
    sign_in: (data: AuthenticationRequest) => Promise<AxiosResponse<AuthenticationResponse>>;
    sign_out: () => Promise<AxiosResponse<never>>;
    revoke: (id: number) => Promise<AxiosResponse<Authentication[]>>;
  };
  user: {
    info: () => Promise<AxiosResponse<User>>;
    create: (data: UserCreateRequest) => Promise<AxiosResponse<User>>;
    verifyEmail: (data: EmailVerificationRequest) => Promise<AxiosResponse<User>>;
    resendVerificationEmail: () => Promise<AxiosResponse<User>>;
  };
  currencies: {
    list: () => Promise<AxiosResponse<Currency[]>>;
    rates: (params: CurrencyRatesParams) => Promise<AxiosResponse<CurrencyRate[]>>;
  };
  companies: {
    list: () => Promise<AxiosResponse<Company[]>>;
    create: (data: CompanyData) => Promise<AxiosResponse<Company>>;
    one: (id: number | string) => Promise<AxiosResponse<Company>>;
    update: (id: number | string, data: CompanyData) => Promise<AxiosResponse<Company>>;
    delete: (id: number | string) => Promise<AxiosResponse<void>>;
    workers: (id: number | string) => Promise<AxiosResponse<CompanyWorker[]>>;
  };
  isAxiosError: typeof isAxiosError;
}
