# supabase-template

## Get started

1. Clone this repo

2. Install Supabase CLI

```bash
brew install supabase/tap/supabase
```

Other installation methods [here](https://supabase.com/docs/guides/cli).

3. Install dependencies

```bash
yarn
```

4. Create the env files

For the frontend:

```bash
cp .env.example .env
```

For supabase functions, write your OPENAI_API_KEY in the `supabase/.env` file.

5. Start the supabase project

```bash
supabase start
```

6. Start the supabase functions locally

```bash
yarn supabase:dev
```

7. Start the frontend locally

```bash
yarn dev
```
