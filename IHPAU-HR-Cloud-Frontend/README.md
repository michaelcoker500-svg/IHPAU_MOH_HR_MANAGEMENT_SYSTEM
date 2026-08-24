# iHPAU HR Suite — Responsive & Security-Hardened Frontend

A responsive React + TypeScript + Vite HR frontend for the IHPAU Sections 01–18 domain architecture.

## What changed in v2
- Mobile-first responsive application shell with drawer navigation.
- Responsive tables become stacked record cards on small screens.
- Responsive dashboards, forms, charts, modals, command palette and recruitment pipeline.
- Working demo interactions: search, filters, employee creation, leave requests, approvals, enrollment, candidate stage movement, notifications, role-aware navigation, CSV export and quick actions.
- Keyboard-friendly command palette with Ctrl/Cmd + K.
- Demo session is stored in `sessionStorage`; passwords are never persisted.
- API service uses credentialed requests, CSRF support, request timeouts and sanitized error categories.
- Security header templates included for static hosting and Nginx.
- Security review and liability register included in `SECURITY.md`.

## Run
```bash
npm install
npm run dev
```

For a production build:
```bash
npm run typecheck
npm run build
```

## Demo accounts
The login screen is a fictional demo selector. It does not authenticate real users.

- superadmin@ihpau.demo
- hr.admin@ihpau.demo
- hr.officer@ihpau.demo
- manager@ihpau.demo
- employee@ihpau.demo
- recruiter@ihpau.demo
- training@ihpau.demo
- performance@ihpau.demo
- finance@ihpau.demo

Password can be any non-empty demo value of at least 3 characters.

## Backend integration
Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to the existing IHPAU Django REST API.

**Never place API secrets, Django secrets, database passwords, JWT signing keys, or private credentials in Vite environment variables.** Anything bundled into a frontend application is public.

The intended production model is backend-managed authentication with secure cookies. The frontend permission checks are only a UX layer; the backend must enforce every permission and organization boundary.

## Security
Read `SECURITY.md` before connecting real HR data. It lists implemented controls, residual liabilities, and the production security checklist.

## Design reference
The login experience follows the supplied IHPAU HR Suite visual direction: dark indigo/purple brand panel, light sign-in surface, clear enterprise typography, feature cards, and a responsive mobile transformation.
