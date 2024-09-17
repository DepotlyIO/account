import { isAxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type {
  Authentication,
  AuthenticationRequest,
  AuthenticationResponse,
} from '@/types/models/authentication';
import type { EmailVerificationRequest, User, UserCreateRequest } from '@/types/models/user';
import type { Currency, CurrencyRate, CurrencyRatesParams } from '@/types/models/currency';
import type { PaginatedResponse } from '@/types/misc';
import type { Order, OrdersListOrder } from '@/types/models/order';

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
  orders: {
    list: () => Promise<AxiosResponse<PaginatedResponse<OrdersListOrder>>>;
    one: (id: number | string) => Promise<AxiosResponse<Order>>;
  };
  isAxiosError: typeof isAxiosError;
}
