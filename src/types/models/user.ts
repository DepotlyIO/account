type AccountType = 'regular' | 'company';

export interface User {
  id: number;
  name: string;
  email: string;
  account_type: AccountType;
}

export interface UserCreateRequest {
  user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
}
