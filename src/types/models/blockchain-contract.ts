export enum BlockchainContractStatus {
  UNKNOWN = 'unknown',
  CREATING = 'creating',
  CREATED = 'created',
  APPROVED = 'approved',
  WAIT_CONFIRMATION = 'wait_confirmation',
  PAYED_PARTIALLY = 'payed_partially',
  PAYED = 'payed',
  REJECTED = 'rejected',
}

export interface BlockchainContract {
  id: number;
  company_contract_id: number;
  status: BlockchainContractStatus;
  request_id: string;
  created_at: string;
  updated_at: string;
}
