import { isAxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type { AuthenticationRequest, AuthenticationResponse } from '@/types/models/authentication';
import type { User, UserCreateRequest } from '@/types/models/user';

export interface Api {
  authentication: {
    sign_in: (data: AuthenticationRequest) => Promise<AxiosResponse<AuthenticationResponse>>;
    sign_out: () => Promise<AxiosResponse<never>>;
  };
  user: {
    info: () => Promise<AxiosResponse<User>>;
    create: (data: UserCreateRequest) => Promise<AxiosResponse<User>>;
  };
  isAxiosError: typeof isAxiosError;
}
