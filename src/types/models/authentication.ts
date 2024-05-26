export interface Tokens {
  access: string;
  refresh: string;
}

export interface Authentication {
  id: number;
  updated_at: string;
  is_mobile: string;
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
