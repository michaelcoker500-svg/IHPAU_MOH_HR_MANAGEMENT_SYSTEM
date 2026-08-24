# IHPAU HR Cloud — Security Review & Liability Register

## Scope
This review covers the frontend project only. It is a defensive engineering review, not a penetration test and not a guarantee that the complete IHPAU system is secure.

## Improvements implemented
- Demo identity is kept in `sessionStorage`, not `localStorage`.
- Demo passwords are never persisted.
- Production API calls use `credentials: include` so the intended model is secure server-side session cookies rather than browser-stored access tokens.
- CSRF token is read from the `csrftoken` cookie and sent as `X-CSRFToken` for state-changing requests when present.
- API requests have a timeout and generic client errors; raw server error bodies are not displayed.
- Permission-aware UI guards are present, but they are explicitly treated as UX only.
- Forms use native validation plus length limits on common fields.
- Modal dialogs support Escape and basic focus trapping.
- No `dangerouslySetInnerHTML`, `eval`, `new Function`, or dynamic script injection is used.
- External avatar URLs were removed from the demo data to reduce third-party tracking and image supply-chain exposure.
- Security response headers are supplied in `public/_headers` and `nginx/security-headers.conf`.
- `.env.example` explicitly forbids putting secrets in Vite environment variables.

## Critical security boundary
The browser is an untrusted environment. A hacker can modify JavaScript, local/session storage, requests, and UI permission checks.

Therefore the Django/backend must independently enforce:
- authentication
- tenant/organization isolation
- object-level authorization
- role and permission checks
- CSRF protection for cookie-authenticated state changes
- rate limiting and brute-force protection
- password hashing with a modern password hasher
- secure cookie flags: `Secure`, `HttpOnly`, and appropriate `SameSite`
- input validation and output encoding
- file upload validation and malware scanning if documents are uploaded
- audit logging
- database constraints and transaction integrity
- secure CORS configuration
- HTTPS everywhere
- dependency and OS patching

## Known liabilities / residual risks
1. **Demo authentication is not production authentication.** The login screen chooses a fictional role and does not verify a real password.
2. **Frontend permission checks can be bypassed.** This is expected; backend authorization must be authoritative.
3. **Vite `VITE_*` values are public.** Never put secrets in them.
4. **CSP needs deployment-specific API origins.** Replace `https://YOUR-API-HOST` in the Nginx example and update `public/_headers` for the actual deployment.
5. **HSTS must only be enabled when the site is served over HTTPS.** Do not use it on an HTTP-only development deployment.
6. **The demo uses mock HR data.** It must not be populated with real employee PII until the backend and deployment controls are reviewed.
7. **No claim of hacker-proof security is made.** Security requires infrastructure, backend, database, identity provider, secrets management, monitoring, backups, and operational controls.
8. **No formal penetration test has been performed in this environment.** Before production, conduct an authorized security assessment and dependency audit.
9. **Document upload security is not complete in this frontend.** Backend storage, MIME validation, extension allowlists, malware scanning, access control, signed download URLs, and retention rules are required.
10. **Production deployment headers must be verified at the actual edge.** Local files do not automatically configure a cloud provider or Nginx server.

## Recommended production security checklist
- [ ] Real backend authentication with secure HttpOnly cookies or an approved identity provider
- [ ] MFA for administrators and privileged roles
- [ ] Short session lifetime + server-side revocation
- [ ] Login throttling / lockout controls
- [ ] CSRF validation on all cookie-authenticated mutations
- [ ] Strict CORS allowlist
- [ ] Per-organization query filtering on every endpoint
- [ ] Object-level permissions on every HR resource
- [ ] Security event monitoring and alerting
- [ ] Centralized audit logs
- [ ] Encrypted database backups
- [ ] Secrets stored outside source control
- [ ] Dependency audit + lockfile review
- [ ] SAST/DAST and authorized penetration testing
- [ ] Secure file upload pipeline
- [ ] Disaster recovery and incident response plan
