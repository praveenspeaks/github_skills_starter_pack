---
name: refactor-without-behavior-change
description: Safe refactoring workflow for .NET and Angular to improve structure/readability without changing externally observable behavior. Use when cleaning up code, reducing duplication, or improving maintainability while keeping tests green.
argument-hint: "[target module] [refactor goal]"
user-invokable: true
disable-model-invocation: false
---

# Refactor Without Behavior Change

## When to use
- Cleanup after feature delivery.
- Reduce duplication, simplify conditionals, rename for clarity.
- Extract services/components while keeping outputs identical.
- Improve testability with no functional changes.

## Guardrails
- No API contract changes unless explicitly approved.
- No new features.
- Keep diffs small; refactor in incremental commits when possible.
- Maintain/extend tests to prove no behavior change.

## Inputs to gather (ask if missing)
- Target files/modules and what “behavior” means (API responses, UI rendering, side effects).
- Existing test coverage status.
- Performance constraints (avoid regressions).

## Procedure
1. **Define behavior invariants**
   - List observable behaviors that must not change (status codes, DTO shape, UI text, sorting).
2. **Baseline**
   - Run tests; capture snapshot outputs where feasible.
3. **Refactor plan**
   - Prefer mechanical refactors: rename, extract method/class, move files, remove dead code.
4. **Apply refactor in steps**
   - Stepwise changes with compilation passing each step.
5. **Verification**
   - Run unit tests + targeted integration tests.
   - Optional: add characterization tests if coverage is missing.
6. **Documentation**
   - Update minimal docs/notes if module boundaries changed.

## Output format
### Refactor plan
- Goal:
- Invariants:
- Steps:

### Proposed patch
- Files impacted:
- Notes on why behavior is unchanged:

### Verification
- Tests to run:
- Additional checks:
