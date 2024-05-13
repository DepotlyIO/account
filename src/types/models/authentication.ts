export interface Tokens {
  access: string;
  refresh: string;
}

export interface Authentication {
  id: number;
  os: string;
  os_version: string;
  browser: string;
  browser_version: string;
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
