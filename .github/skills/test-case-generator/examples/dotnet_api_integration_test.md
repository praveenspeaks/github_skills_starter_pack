# Example: .NET API integration test outline (WebApplicationFactory)

## Goal
Verify endpoint behavior end-to-end (routing, auth, validation, DI, serialization).

## Pattern
- Use `WebApplicationFactory<Program>`
- Configure test auth (fake JWT / test scheme)
- Use in-memory DB or test container (depending on repo policy)
- Assert on:
  - status code
  - response body shape
  - validation errors (ProblemDetails)
  - auth failures (401/403)

## Acceptance
- No real network calls
- No dependency on developer machine state
