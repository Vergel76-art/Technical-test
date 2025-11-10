# Patient Management Dashboard (React + TypeScript + Vite)

A simple telehealth patient management UI built with React, TypeScript, and Vite. It demonstrates per‑patient video session actions using Apollo Client with mocked GraphQL responses.

Repository: https://github.com/Vergel76-art/Technical-test.git

## Requirements

- Node.js 18+ (recommended: Node 20 LTS)
- npm 9+

## Quick Start

1) Clone the repo

   ```bash
   git clone https://github.com/Vergel76-art/Technical-test.git
   cd Technical-test
   ```

2) Install dependencies

   ```bash
   npm install
   ```

3) Run the dev server

   ```bash
   npm run dev
   ```

   Vite will print the local URL (e.g. http://localhost:5173/). If that port is busy, it will choose another (e.g. http://localhost:5174/). Open the printed URL in your browser.

## Available Scripts

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — type‑check and build the production bundle into `dist/`
- `npm run preview` — preview the built app locally from `dist/`
- `npm run lint` — run ESLint on the project

## GraphQL and Mocks

This app uses Apollo Client’s `MockedProvider` for development; no backend is required.

- Provider setup: `src/main.tsx`
- Mocks: `src/mocks.ts` (includes Login and CreateConsultationSession responses)
- Operations: `src/graphql/queries.ts`

Per‑row “Start Video” buttons in the patient table call the `CREATE_CONSULTATION_SESSION` mutation with an `appointmentId` derived from the patient’s id (e.g. `appt-1`). Mocks are duplicated to support StrictMode and repeated clicks.

## UI Overview

- Top Actions bar: “Secure Login” button
- Patient table: an “Actions” column with a per‑row “Start Video” button; clicking it shows a small status message within the row

## Build & Deploy

```bash
npm run build
npm run preview
```

The production build is emitted to `dist/` and can be served by any static host (e.g., Nginx, Vercel, Netlify).

## Troubleshooting

- Port already in use: Vite will automatically choose a different port; use the printed URL.
- Windows line endings: the repo is configured with `core.autocrlf=true` for compatibility.
- Apollo typings: mutations are strongly typed using generics in `useMutation`; if adding new ops, follow the existing pattern in `ActionsBar.tsx` and `PatientRow.tsx`.

## License

MIT (or your chosen license)
