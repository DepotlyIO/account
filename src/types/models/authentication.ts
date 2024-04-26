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
  tokens: Tokens;
}
