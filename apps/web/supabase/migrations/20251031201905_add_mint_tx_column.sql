-- Add mint_tx column to accounts table to store the transaction hash when NFT is minted
ALTER TABLE accounts ADD COLUMN mint_tx TEXT NOT NULL;
