-- 1. Accounts table
create table accounts (
  id uuid primary key default gen_random_uuid(),
  wallet_address text unique not null,
  minted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- 2. Referrals table
create table referrals (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade unique not null,
  referral_code text not null,
  redeem_count integer not null default 0,
  created_at timestamp without time zone not null default now(),
  constraint referrals_referral_code_key unique (referral_code)
);

-- 3. Metrics (latest)
create table metrics (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade unique not null,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 4. Metrics history
create table metrics_history (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade not null,
  data jsonb not null,
  recorded_at timestamptz not null
);

-- 4. Scores (latest)
create table scores (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade unique not null,
  score integer not null,
  updated_at timestamptz not null default now()
);

-- 5. Scores history
create table scores_history (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade not null,
  score integer not null,
  recorded_at timestamptz not null
);


-- Index for quick lookup by wallet address
create index idx_accounts_wallet_address on accounts(wallet_address);
create index idx_referrals_account_id on referrals(account_id);
create index idx_metrics_account_id on metrics(account_id);
create index idx_metrics_history_account_id on metrics_history(account_id);
create index idx_scores_account_id on scores(account_id);
create index idx_scores_history_account_id on scores_history(account_id);
