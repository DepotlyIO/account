import type { CryptoCurrencyCode } from '@/types/models/currency';

export type OrderStatus =
  | 'draft'
  | 'published'
  | 'in_progress'
  | 'checking'
  | 'revoked'
  | 'wait_payment'
  | 'completed';

export interface OrderUser {
  id: number;
  name: string;
}

export interface OrdersListOrder {
  id: number;
  title: string;
  price: string;
  currency_code: CryptoCurrencyCode;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  customer: OrderUser;
  performer: null;
}

export interface Order extends OrdersListOrder {
  performer: OrderUser | null;
  content: string;
}
