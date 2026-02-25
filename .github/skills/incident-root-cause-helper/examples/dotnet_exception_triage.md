# Example: .NET exception triage template

## Input
- Exception: `NullReferenceException`
- Location: `OrderMapper.Map(...)`
- CorrelationId: `...`

## Hypotheses
1) API received an unexpected null field due to upstream contract change.
2) Mapping code assumes non-null but DTO allows null.
3) Race condition / caching returns partial object.

## Evidence
- Inspect request/response samples (masked).
- Check recent DTO changes.
- Add unit test with null field to reproduce.

## Minimal fix
- Guard: throw validation error (400) if required fields missing, rather than NRE -> 500.
- Add unit test to ensure 400 with ProblemDetails shape.
