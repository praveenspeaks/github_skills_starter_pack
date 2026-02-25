# Example: Characterization test approach (.NET)

When refactoring legacy logic with limited tests:
1) Write tests against current behavior (even if behavior is weird).
2) Refactor safely.
3) Then (optionally) adjust behavior in a separate, explicitly-scoped change.

Checklist:
- Capture edge cases from production logs (masked).
- Create parameterized tests for those cases.
- Lock down response shapes and status codes.
