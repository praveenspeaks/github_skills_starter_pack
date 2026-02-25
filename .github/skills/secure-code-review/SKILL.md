---
name: secure-code-review
description: Security-focused PR review for .NET APIs and Angular apps. Use when code touches authN/authZ, secrets, HTTP calls, file upload, serialization, database access, logging, or input validation. Produces findings-by-severity and concrete fixes.
argument-hint: "[PR/branch] [areas changed: auth|api|db|ui]"
user-invokable: true
disable-model-invocation: false
---

# Secure Code Review (.NET + Angular)

## When to use
Use this skill to harden a change **before merge** when any of these apply:
- Authentication/authorization changes (JWT/OIDC, guards, policies, roles/claims).
- New/changed API endpoints, request models, serialization, file uploads.
- Database access (EF Core queries, raw SQL, stored procs).
- Secrets/config changes, CI variables, connection strings.
- Angular HTTP interceptors, route guards, DOM-binding, sanitization.
- Logging/telemetry changes that might leak sensitive data.

## Non‑negotiables (governance)
- **Do not** request or paste secrets, credentials, personal data, or customer identifiers.
- Engineers remain accountable: **no blind acceptance** of AI output.
- Keep changes auditable: record key security decisions in PR notes.

## Inputs to gather (ask if missing)
- Changed files list (or PR diff).
- App type: API, Worker, Angular SPA, or mixed.
- Auth model: JWT/OIDC, cookies, API keys, mTLS, etc.
- Data classification involved: Public/Internal/Confidential/Restricted.
- Existing security standards docs (if present).

## Procedure (step-by-step)
1. **Scope & attack surface**
   - Identify entry points: controllers/endpoints, message handlers, background jobs, Angular components receiving user input.
2. **Threat checklist**
   - For each entry point, check: input validation, authZ checks, error handling, logging, rate limiting, data exposure.
3. **.NET checks**
   - Validate model binding & DTOs: required fields, length limits, enums, regex, numeric ranges.
   - AuthZ: `[Authorize]` attributes, policies, role/claim checks; deny-by-default for sensitive endpoints.
   - EF Core: avoid string-concatenated SQL; parameterize; ensure queries are scoped (tenant/user).
   - Serialization: avoid unsafe polymorphic deserialization; ensure `System.Text.Json` settings are safe.
   - Secrets: ensure config uses KeyVault/secure store; no secrets in appsettings or code.
   - Exceptions: no leaking stack traces/details in API responses; map to safe problem details.
4. **Angular checks**
   - Template binding: avoid bypassing sanitization; avoid `[innerHTML]` with untrusted content.
   - HTTP: ensure auth headers handled by interceptor; handle 401/403 consistently.
   - Routing: guards for protected routes; no client-only authorization (server must enforce).
   - Dependencies: avoid unsafe packages; check for direct DOM manipulation risks.
5. **Abuse cases & negative tests**
   - Identify 3–5 abuse cases and ensure tests exist or add a test plan.
6. **Output findings**
   - Provide findings by severity with exact file/line pointers and recommended patch approach.

## Severity scale
- **Critical**: auth bypass, secret leak, RCE/deserialization, SQL injection, stored XSS.
- **High**: IDOR, missing authZ check, sensitive data exposure, insecure direct object access.
- **Medium**: weak validation, verbose errors, missing CSRF considerations, insufficient logging hygiene.
- **Low**: minor hardening, best-practice alignment, cleanup.

## Output format (must follow)
Return a markdown report:

### Summary
- Risk level: Low/Medium/High/Critical
- Areas reviewed: ...
- Top 3 actions: ...

### Findings
For each:
- Severity:
- Location:
- Description:
- Why it matters:
- Recommendation (exact code-level steps):
- Suggested tests:

### PR Notes (copy/paste)
- AI-assisted review performed using `secure-code-review` skill.
- Key decisions:
  - ...
