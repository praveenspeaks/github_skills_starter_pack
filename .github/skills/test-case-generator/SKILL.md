---
name: test-case-generator
description: Generate unit/integration tests for .NET (xUnit/NUnit/MSTest) and Angular (Jasmine/Karma or Jest). Use when adding features, fixing bugs, or increasing coverage for critical logic. Produces deterministic tests + a short test plan.
argument-hint: "[target file/class/component] [behavior to test]"
user-invokable: true
disable-model-invocation: false
---

# Test Case Generator (.NET + Angular)

## When to use
- New endpoint / handler / service logic in .NET.
- Bug fix: create regression tests **before** changing implementation.
- Angular component/service changes where behavior can be unit tested.
- Need a clear, reviewable test plan with edge cases.

## Non‑negotiables
- Tests must be **deterministic** (no real network, no timing flakiness).
- Prefer **AAA** (Arrange-Act-Assert) structure and readable naming.
- Keep mocks minimal and meaningful.
- Do not require secrets, prod data, or real customer identifiers.

## Inputs to gather (ask if missing)
- Test framework and style:
  - .NET: xUnit + FluentAssertions? NUnit? MSTest?
  - Mocking: Moq/NSubstitute/FakeItEasy?
  - Integration: WebApplicationFactory?
- Angular test runner: Jasmine/Karma or Jest, Angular version.
- Expected behavior + edge cases (happy path + failure modes).
- Relevant existing tests to follow conventions.

## Procedure
1. **Summarize behavior**
   - Restate expected behavior in bullet points (acts as a mini spec).
2. **Derive test matrix**
   - Happy path, invalid inputs, boundary values, auth/permission failures, external dependency failures.
3. **Pick test layer**
   - Unit for pure logic; integration for controller pipeline/DI/filters; contract tests for API shapes.
4. **Generate tests**
   - Provide test code in minimal new files; avoid modifying production code unless needed for testability.
5. **Run commands**
   - Provide exact commands to run tests locally/CI (generic placeholders if unknown).
6. **Output**
   - Test plan + code + coverage note.

## Output format
### Test plan
- Target:
- Test layer:
- Cases:
  1. ...
  2. ...

### Proposed files
- `.../SomeTests.cs`
- `.../some.component.spec.ts`

### Test code
(Provide code blocks per file)

### How to run
- .NET: `dotnet test <solution-or-project>`
- Angular: `npm test` or `ng test` (confirm actual command)

### Notes
- Mocking decisions:
- Determinism notes:
