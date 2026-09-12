# LexCorp Horizon

Enterprise legal compliance dashboard for Kenyan corporate entities — tracks
BRS, KRA, NSSF, and eTIMS compliance status per client/vendor entity across
three role-gated portals: Advocate, HR, and Procurement.

## Stack

- React 19 + TypeScript + Vite 6
- Tailwind v4, Radix UI, lucide-react
- Supabase (auth + data)
- jsPDF (compliance report export)

## Prerequisites

- Node.js 18+
- A Supabase project (Settings → API for your URL and anon key)

## Setup

1. Clone and install:

   ```bash
   git clone <your-repo-url>
   cd lexcorp-horizon
   npm install
   ```

2. Copy the env template and fill in your own values:

   ```bash
   cp .env.example .env.local
   ```

   Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase
   project. `.env.local` is git-ignored — never commit real credentials.

3. Set each user's portal role in Supabase. `AppContext` reads
   `user.user_metadata.role`, which must be one of `Advocate`, `HR_Manager`,
   or `Ops_Procurement`. Set this when you invite/create the user (Auth →
   Users → edit metadata, or via the admin API on sign-up). A user with no
   role set is treated as unauthenticated for portal purposes rather than
   defaulted into a portal.

4. Run locally:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   npm run preview   # sanity-check the production build locally
   ```

   The `dist/` folder is what you deploy (Vercel, Netlify, GitHub Pages via
   an Actions workflow, Cloud Run, etc.).

## Before going further than local dev

Role gating in this app (`AppContext` → which portal renders) is a
**client-side UI convenience**, not a security boundary. If any portal reads
or writes Supabase tables directly, add Row-Level Security policies on those
tables that check the requesting user's role/branch — otherwise an
authenticated user could reach another portal's data by calling the Supabase
API directly, bypassing the React routing entirely.

## Project structure

```
src/
  App.tsx                 Root shell: auth gate → role → portal switch
  main.tsx                Entry point
  index.css               Theme tokens (navy/gold) + Tailwind import
  data.ts                 Mock client/team data (swap for real Supabase queries)
  types.ts                Shared TS types
  supabaseClient.ts        Supabase client init
  context/
    AppContext.tsx        Auth session, role derivation, login/logout
  components/
    Login.tsx
    layout/PortalShell.tsx  Shared sidebar/topbar/mobile-menu chrome
    shared/                 StatusDot, RiskBadge, StatCard, ClientComplianceTable, TeamRoster
    portals/                AdvocatePortal, HRPortal, ProcurementPortal
```

## Known gaps / next steps

- Client and team data are still static mocks in `data.ts` — no live Supabase
  queries yet.
- HR portal's "add member" flow is local React state only; wire it to a
  `team_members` table to persist.
- No RLS policies included — see the security note above.
