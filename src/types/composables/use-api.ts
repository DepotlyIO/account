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
import type { CompanyContract, CompanyContractData } from '@/types/models/company-contract';
import type { BlockchainContract } from '@/types/models/blockchain-contract';

export interface Api {
  datasets: {
    countries: () => Promise<AxiosResponse<string[]>>;
  };
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
    contracts: (id: number | string) => Promise<AxiosResponse<CompanyContract[]>>;
    create_contract: (
      company_id: number | string,
      data: CompanyContractData,
    ) => Promise<AxiosResponse<CompanyContract>>;
  };
  company_contracts: {
    one: (
      company_id: number | string,
      contract_id: number | string,
    ) => Promise<AxiosResponse<CompanyContract>>;
    create_blockchain_contract: (
      company_id: number | string,
      company_contract_id: number | string,
    ) => Promise<AxiosResponse<BlockchainContract>>;
    pay_blockchain_contract: (id: number | string) => Promise<AxiosResponse<BlockchainContract>>;
  };
  isAxiosError: typeof isAxiosError;
}
