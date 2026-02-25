# Example: Angular HTTP error triage template

## Symptom
- UI shows blank page after clicking "Approve Order"
- Browser console: 403 from `/api/orders/{id}/approve`

## Hypotheses
1) Route guard allows navigation but API policy denies due to missing claim.
2) Token refresh failed; stale token sent.
3) Environment config points to wrong API base URL.

## Evidence to collect
- Network tab: request headers (mask tokens), response body.
- Check interceptor and auth service logs.
- Verify backend policy mapping and claims issuance.

## Fix approach
- Align Angular guard/UX to show "not authorized" on 403.
- Backend: confirm correct policy and claim names.
- Add integration test that returns 403 without claim.
