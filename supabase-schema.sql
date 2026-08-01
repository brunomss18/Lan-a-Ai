-- Rode este script inteiro no SQL Editor do seu projeto Supabase.
-- Cria as tabelas do Talão com RLS (Row Level Security) para que
-- cada usuário só veja e altere os próprios dados.

create extension if not exists "uuid-ossp";

create table if not exists cards (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  closing_day int not null,
  due_day int not null,
  limit_amount numeric,
  is_default boolean default false,
  created_at timestamptz default now()
);

create table if not exists transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric not null,
  card_id uuid references cards(id) on delete set null,
  card_name text,
  merchant text,
  category text not null default 'Outros',
  date date not null,
  raw text,
  installment_group_id uuid,
  installment_index int,
  installment_total int,
  recurrence_id uuid,
  created_at timestamptz default now()
);

create table if not exists category_rules (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  keyword text not null,
  category text not null,
  created_at timestamptz default now()
);

create table if not exists budgets (
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  amount numeric not null,
  primary key (user_id, category)
);

create table if not exists global_budget (
  user_id uuid primary key references auth.users(id) on delete cascade,
  amount numeric not null
);

create table if not exists recurrences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  merchant text not null,
  category text not null,
  amount numeric not null,
  day int not null,
  card_id uuid references cards(id) on delete set null,
  card_name text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Row Level Security: cada usuário só acessa suas próprias linhas
alter table cards enable row level security;
alter table transactions enable row level security;
alter table category_rules enable row level security;
alter table budgets enable row level security;
alter table global_budget enable row level security;
alter table recurrences enable row level security;

create policy "own rows" on cards for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on transactions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on category_rules for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on budgets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on global_budget for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on recurrences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
