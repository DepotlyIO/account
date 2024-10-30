export enum RequestNetworkContractStatus {
  CREATING = 'creating',
  CREATED = 'created',
  READY_TO_PAY = 'ready_to_pay',
  TRANSACTION_CREATION = 'transaction_creation',
  TRANSACTION_CONFIRMATION = 'transaction_confirmation',
  PAYED_PARTIALLY = 'payed_partially',
  PAYED = 'payed',
  REJECTED = 'rejected',
}

export interface RequestNetworkContract {
  id: number;
  contract_id: number;
  status: RequestNetworkContractStatus;
  request_id: string;
  created_at: string;
  updated_at: string;
}
