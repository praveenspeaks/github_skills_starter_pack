Hands-on workshop exercises (Copilot Skills) — .NET + Angular
Designed to match your playbook: mode/model choice, prompting framework, AI-assisted testing, review hardening, traceability, and data-minimization.

Format (recommended)
Duration: 2.5–3 hours (or split into 2×90 min)
Teams: pairs (driver/navigator), rotate every exercise
Rule: each pair must (1) use the /skill, (2) run tests/build, (3) capture a short PR note of AI usage
Pre-work (10–15 min)
Ensure repo contains: .github/skills/... (your 5 skills).
In VS Code Copilot Chat: switch to Agent mode.
Verify skills show when typing /.
Compliance reminder (from playbook): no secrets/PII/customer identifiers in prompts; use sanitized samples.

Exercise 1 — “Skill discovery + prompt quality” (20 min)
Goal: make devs practice mode/model selection + prompt template and learn how skills are invoked.

Task
Each pair picks one real module (API or Angular) and asks Copilot to:

summarize architecture
identify where validation/auth/error handling lives
Required Copilot usage
Mode: Ask (Fast/Balanced)
Prompt must include: Role, Goal, Context, Boundaries, Acceptance criteria, Output format.
Deliverable
A short markdown note in the ticket/PR draft:
What mode/model used and why
What files were touched (should be none yet)
3 “rules of the codebase” discovered
Exercise 2 — .NET unit tests with /test-case-generator (30–40 min)
Goal: use the skill to generate deterministic xUnit tests and validate output.

Scenario (you can adapt to your repo)
You have a service method like:

PricingService.CalculateDiscount(...)
or OrderService.CalculateTotal(...)
There’s logic for edge cases:

empty cart
negative quantity
expired coupon
rounding rules
Steps
Ask Copilot to infer expected behavior from code (no changes).
Run /test-case-generator with explicit scenarios.
Run tests; fix compilation issues; ensure tests are readable.
Required Copilot usage
Example prompt (developers can copy):

.net
/test-case-generator
Target: PricingService.CalculateDiscount in src/Backend/.../PricingService.cs
Tests: xUnit + Moq
Cover: valid coupon, expired coupon -> expected exception, empty cart -> 0, rounding behavior
Do not: change production code yet
Output: test plan + test class
Deliverable
New test file committed
Evidence: “tests green” screenshot/log snippet
Exercise 3 — Angular component spec with /test-case-generator (30–40 min)
Goal: generate Angular tests that match your team pattern and avoid flaky async tests.

Scenario
Pick one:

component loads data on ngOnInit and shows spinner/error state
reactive form validation (required + pattern)
table filtering/sorting logic
Steps
Identify the component + dependent service.
Run /test-case-generator requesting:
success state
error state
loading state
Run ng test (or your test command) and stabilize async behavior.
Deliverable
*.spec.ts added/updated
tests passing locally
Exercise 4 — “DTO change without breaking consumers” using /api-contract-guardian (25–35 min)
Goal: train them to think contract-first across .NET API + Angular consumers.

Scenario
Simulate a change:

Add a field to a response DTO
Make a request field required
Rename a property (breaking)
Steps
Change a DTO (in a branch).
Invoke:
.net
/api-contract-guardian
Change: CreateOrderRequestDto added required field "shippingAddress"
Consumers: Angular order.service.ts and external clients
Output: breaking-change analysis + mitigation options + required consumer updates
Implement the least-breaking option (e.g., make optional + server default) OR version endpoint (depending on your standards).
Update Angular model/service accordingly.
Add/adjust contract tests if you have them.
Deliverable
“Compatibility report” pasted into PR description
code changes + tests/build green
Exercise 5 — PR hardening with /secure-code-review (25–35 min)
Goal: use the skill as a repeatable security checklist for both .NET and Angular.

Scenario
Use the branch from Exercise 4 (or any PR-sized change).

Steps
Run /secure-code-review on the changed files.
Ensure it checks:
authz attributes/guards ([Authorize], route guards)
input validation
secrets/logging
error handling and ProblemDetails usage (if applicable)
Apply at least 2 improvements found by the skill.
Deliverable
PR checklist section:
Findings: High/Medium/Low
Fixes applied
Remaining risks (if any)
Exercise 6 — Production-style triage using /incident-root-cause-helper (30–45 min)
Goal: practice incident response with the agent skill and your playbook’s debugging approach.

Scenario options
.NET: intermittent NullReferenceException in a handler/service
Angular: intermittent 401/403 loop due to token refresh timing
API: “only fails for large payloads” / “only certain tenants”
Steps
Provide sanitized “incident packet” (template below).
Run /incident-root-cause-helper.
The pair must produce:
top hypotheses ranked
data to collect next
minimal-risk fix + regression test plan
Optional: implement the fix and add regression test.
Incident packet template (sanitized)
Symptom:
Frequency:
Endpoint/page:
Stack trace (sanitized):
Recent deploy changes:
Logs (sanitized):
Expected behavior:
What we already tried:
Deliverable
Incident note (markdown) with hypotheses + next actions + test plan
Exercise 7 — Safe refactor using /refactor-without-behavior-change (30–45 min)
Goal: train “refactor with guardrails”: characterization tests first, then refactor.

Scenario
Pick one “messy” class:

long method
duplicate logic
nested conditions
Angular service with repeated mapping logic
Steps
Run /refactor-without-behavior-change and force it to:
generate characterization tests first (or test plan if hard)
propose refactor steps
ensure no contract changes
Apply refactor and run full test suite.
Deliverable
Before/after diff
Tests unchanged or expanded (no loss)
Short PR description including AI usage summary
Scoring rubric (so you can measure skill adoption)
For each exercise, score 0–2:

Prompt quality (used template, constraints clear)
Correct mode/model (Ask/Edit/Agent/Review with sensible tier)
Quality gates (tests run, no blind merge)
Traceability (PR notes include AI usage summary)
Data safety (no sensitive content)
