---
name: api-contract-guardian
description: Prevent breaking API changes for .NET backends consumed by Angular or other clients. Use when changing controllers/endpoints/DTOs, OpenAPI/Swagger, auth requirements, pagination/sorting, or error shapes. Produces compatibility assessment + contract test plan.
argument-hint: "[endpoint/DTO] [change description]"
user-invokable: true
disable-model-invocation: false
---

# API Contract Guardian (.NET backend, Angular consumer)

## When to use
- Adding/changing endpoints, routes, query params, headers.
- Modifying DTOs (rename/remove fields, type changes, enum changes).
- Changing auth requirements (401/403 behavior).
- Changing pagination defaults, sorting, filtering behavior.
- Changing error shapes (ProblemDetails, validation errors).

## Non‑negotiables
- Prefer backward compatible changes (additive).
- If breaking is required: version, communicate, and add migration steps.
- Contract must be testable and documented.

## Inputs to gather (ask if missing)
- Endpoint(s) impacted and current request/response examples.
- Consumer(s): Angular app module/service names, other services.
- Current OpenAPI/Swagger location (if used).
- Error handling standard (ProblemDetails? custom envelope?).

## Procedure
1. **Classify the change**
   - Additive (safe), behavior change (risky), breaking (requires versioning).
2. **Identify consumers**
   - Search references in Angular services and other backend clients.
3. **Check breaking patterns**
   - Removed/renamed fields
   - Type narrowing (string -> int, nullable -> non-nullable)
   - Enum value removal/renaming
   - Route changes
   - Status code changes
4. **Define compatibility approach**
   - Add new fields but keep old; deprecate with warnings.
   - Introduce new endpoint version: `/v2/...` or header-based versioning (per team policy).
5. **Create contract tests**
   - Minimum:
     - Schema/shape test for response DTO
     - Validation error shape test
     - Auth error shape test
6. **Update docs**
   - OpenAPI/Swagger annotations or docs page.
7. **Output decision**
   - Provide explicit “Safe / Risky / Breaking” with required actions.

## Output format
### Contract impact assessment
- Classification: Safe (additive) / Risky / Breaking
- Why:
- Consumers impacted:
- Required actions:

### Proposed contract tests
- Test type: unit/integration/consumer-driven
- Cases:
  1. ...
  2. ...

### Migration notes (if breaking)
- Deprecation plan:
- Timeline:
- Angular changes required:
