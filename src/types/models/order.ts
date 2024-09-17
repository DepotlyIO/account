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

interface BaseOrder {
  id: number;
  title: string;
  price: string;
  currency_code: CryptoCurrencyCode;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  customer: OrderUser;
}

export interface OrdersListOrder extends BaseOrder{
  performer: null;
}

export interface Order extends BaseOrder {
  performer: OrderUser | null;
  content: string;
}
