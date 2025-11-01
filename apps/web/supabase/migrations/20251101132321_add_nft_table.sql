-- Create NFT table to store minting-related data
CREATE TABLE IF NOT EXISTS nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL UNIQUE,
  tx_hash VARCHAR(66) NOT NULL UNIQUE,
  token_id BIGINT NOT NULL UNIQUE,
  minted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  -- Foreign key to account table
  CONSTRAINT fk_nft_accounts FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- Create indexes for efficient querying
CREATE INDEX idx_nft_minted_at ON nfts(minted_at);
