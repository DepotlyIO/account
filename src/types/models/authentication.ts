import type { User } from '@/types/models/user';

export interface Tokens {
  access: string;
  refresh: string;
}

export interface AuthenticationRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface AuthenticationResponse {
  user: User;
  tokens: Tokens;
}
