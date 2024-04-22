import { isAxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type { AuthenticationRequest, AuthenticationResponse } from '@/types/models/authentication';
import type { User } from '@/types/models/user';

export interface Api {
  authentication: {
    sign_in: (data: AuthenticationRequest) => Promise<AxiosResponse<AuthenticationResponse>>;
    sign_out: () => Promise<AxiosResponse<never>>;
    autologin: () => Promise<AxiosResponse<User>>;
  };
  isAxiosError: typeof isAxiosError;
}
