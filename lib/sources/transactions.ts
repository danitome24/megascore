import axios from "axios";

export type TransactionParty = {
  ens_domain_name: string | null;
  hash: string;
  implementations: any[];
  is_contract: boolean;
  is_scam: boolean;
  is_verified: boolean;
  metadata: any;
  name: string | null;
  private_tags: any[];
  proxy_type: string | null;
  public_tags: any[];
  reputation: string;
  watchlist_names: any[];
};

export type TransactionFee = {
  type: string;
  value: string;
};

export type TransactionItem = {
  priority_fee: string | null;
  raw_input: string;
  is_pending_update: boolean;
  result: string;
  hash: string;
  max_fee_per_gas: string | null;
  revert_reason: string | null;
  confirmation_duration: [number, number];
  transaction_burnt_fee: string | null;
  type: number;
  token_transfers_overflow: any;
  confirmations: number;
  position: number;
  max_priority_fee_per_gas: string | null;
  transaction_tag: string | null;
  created_contract: string | null;
  value: string;
  from: TransactionParty;
  gas_used: string;
  status: string;
  to: TransactionParty;
  authorization_list: any[];
  method: string | null;
  fee: TransactionFee;
  actions: any[];
  gas_limit: string;
  gas_price: string;
  decoded_input: any;
  token_transfers: any;
  base_fee_per_gas: string;
  timestamp: string;
  nonce: number;
  historic_exchange_rate: string;
  transaction_types: string[];
  exchange_rate: string | null;
  block_number: number;
  has_error_in_internal_transactions: boolean | null;
};

export type TransactionApiResponse = {
  items: TransactionItem[];
  next_page_params: any;
};

const API_URL = "https://megaeth-testnet.blockscout.com/api/v2";

export async function fetchTransactions(address: string): Promise<TransactionApiResponse> {
  if (!address) throw new Error("Address is required");
  const url = `${API_URL}/addresses/${address}/transactions`;
  const response = await axios.get(url, {
    headers: { accept: "application/json" },
  });
  return response.data as TransactionApiResponse;
}
