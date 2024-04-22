type AccountType = 'regular' | 'company';

export interface User {
  id: number;
  name: string;
  email: string;
  account_type: AccountType;
}
