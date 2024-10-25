import { isAxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type {
  Authentication,
  AuthenticationRequest,
  AuthenticationResponse,
} from '@/types/models/authentication';
import type { EmailVerificationRequest, User, UserCreateRequest } from '@/types/models/user';
import type { Currency, CurrencyRate, CurrencyRatesParams } from '@/types/models/currency';
import type { Contract, ContractData } from '@/types/models/contract';
import type { RequestNetworkContract } from '@/types/models/request-network-contract';
import type { Blockchain, Wallet, WalletCreateData } from '@/types/models/wallet';

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
  contracts: {
    list: (id: number | string) => Promise<AxiosResponse<Contract[]>>;
    one: (id: number | string) => Promise<AxiosResponse<Contract>>;
    create: (data: ContractData) => Promise<AxiosResponse<Contract>>;
    create_request_network_contract: (
      contract_id: number | string,
    ) => Promise<AxiosResponse<RequestNetworkContract>>;
    pay_request_network_contract: (
      id: number | string,
    ) => Promise<AxiosResponse<RequestNetworkContract>>;
  };
  wallets: {
    list: () => Promise<AxiosResponse<Wallet[]>>;
    one: (blockchain: Blockchain) => Promise<AxiosResponse<Wallet>>;
    create: (data: WalletCreateData) => Promise<AxiosResponse<Wallet>>;
  };
  isAxiosError: typeof isAxiosError;
}
