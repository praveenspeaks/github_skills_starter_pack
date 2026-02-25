# Example: .NET API AuthZ review notes (template)

## Context
- Endpoint added: `POST /api/orders/{orderId}/approve`
- Auth: JWT bearer; claims include `role`, `tenantId`
- Data: Internal (no PII)

## What to check
- Controller has `[Authorize(Policy = "Orders.Approve")]` or equivalent.
- Server-side validates that `orderId` belongs to caller tenant (prevent IDOR).
- Validation:
  - `orderId` is GUID.
  - Body fields required and have max lengths.
- Error handling returns safe `ProblemDetails` without internal exceptions.
- Logs avoid writing request body or tokens.

## Example finding wording
- Severity: High
- Location: `OrdersController.cs:42`
- Issue: Missing tenant scoping check; any authenticated user can approve any order ID.
- Recommendation: enforce tenant filter in query and add a failing test for cross-tenant approval.
