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

4. Create frontend env file

```bash
cp .env.example .env
```

5. Create supabase functions env file

```bash
echo "OPENAI_API_KEY=sk-xxx" > supabase/.env
```

6. Start the supabase project

```bash
supabase start
```

7. Start the supabase functions locally

```bash
yarn supabase:dev
```

8. Start the frontend locally

```bash
yarn dev
```

9. Open [http://localhost:3100](http://localhost:3100) with your browser to see the result.

## Deploy

1. Create a new project on [Supabase](https://supabase.io)

2. Create a new project on [Vercel](https://vercel.com)

3. To deploy the frontend, connect your Vercel project to your GitHub repo and push to main.

4. To deploy the supabase functions, first login to Supabase:

```bash
supabase login
```

Then, link your project:

```bash
supabase link --project-ref <project-ref>
```

Then, deploy the functions:

```bash
yarn supabase:deploy
```

Optionally, if you're also using the Supabase Vector Store from LangcChain, you'll need to push the schema to the database:

```bash
supabase db push
```
