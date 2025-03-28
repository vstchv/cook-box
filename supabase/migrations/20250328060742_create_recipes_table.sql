create table recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  title text not null,
  image_url text,
  ingredients jsonb not null,
  instructions jsonb not null,
  source_url text,
  created_at timestamp default now()
);
