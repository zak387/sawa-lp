# Supabase Lead Capture — Design

**Date:** 2026-06-02
**Scope:** Wire the `/lp` audit email form to store leads in Supabase.

## Goal

When a visitor submits their email on the `/lp` one-pager, persist it to a
Supabase `leads` table via a direct client-side insert.

## Out of scope

- The homepage (`/`) CTA form — intentionally left untouched.
- Auth, user accounts, reading leads from the browser.

## Architecture

Direct client-side insert using the public anon key. No API route. Security is
enforced by Row Level Security: anonymous role may `INSERT` but not `SELECT`.

## Components

### 1. Database table: `leads`

| column       | type          | notes                              |
|--------------|---------------|------------------------------------|
| `id`         | `uuid`        | primary key, default `gen_random_uuid()` |
| `email`      | `text`        | not null                           |
| `source`     | `text`        | which form (`"lp"`)                |
| `created_at` | `timestamptz` | default `now()`                    |

RLS enabled. One policy: allow `INSERT` for role `anon`. No `SELECT` policy, so
the list cannot be read from the browser.

### 2. Supabase client — `src/lib/supabase.ts`

Creates the browser client from env vars using `@supabase/supabase-js`.

### 3. Env vars — `.env.local` (gitignored)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Form wiring — `src/app/lp/page.tsx`

`handleSubmit` becomes async:
- set a `loading` state (disable Send button / show pending)
- `await supabase.from('leads').insert({ email, source: 'lp' })`
- on success → existing "submitted" success state
- on error → show an inline error message, keep the form open

## Data flow

`/lp` form → `supabase.from('leads').insert()` (anon key, browser) → Supabase
Postgres `leads` table (RLS allows insert).

## Error handling

- Empty email: already guarded (`if (!email) return`).
- Insert failure (network / RLS): catch, show inline error, do not advance to
  success state.

## Dependencies

- `@supabase/supabase-js`
