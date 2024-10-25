export enum RequestNetworkContractStatus {
  UNKNOWN = 'unknown',
  CREATING = 'creating',
  CREATED = 'created',
  APPROVED = 'approved',
  WAIT_CONFIRMATION = 'wait_confirmation',
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
