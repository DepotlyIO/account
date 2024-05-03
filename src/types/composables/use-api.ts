import { isAxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type { AuthenticationRequest, AuthenticationResponse } from '@/types/models/authentication';
import type { EmailVerificationRequest, User, UserCreateRequest } from '@/types/models/user';

interface AlmostEmptyAnswer {
  message: 'ok';
}

export interface Api {
  authentication: {
    sign_in: (data: AuthenticationRequest) => Promise<AxiosResponse<AuthenticationResponse>>;
    sign_out: () => Promise<AxiosResponse<never>>;
  };
  user: {
    info: () => Promise<AxiosResponse<User>>;
    create: (data: UserCreateRequest) => Promise<AxiosResponse<User>>;
    verifyEmail: (data: EmailVerificationRequest) => Promise<AxiosResponse<AlmostEmptyAnswer>>;
    resendVerificationEmail: () => Promise<AxiosResponse<AlmostEmptyAnswer>>;
  };
  isAxiosError: typeof isAxiosError;
}
