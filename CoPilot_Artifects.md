1) What you want to achieve (and the right Copilot artifacts)
Think of Copilot customization as 3 different things:

Always-on repo rules (coding style, stack, “don’t do” rules)
→ .github/copilot-instructions.md (applies automatically in chat/agent contexts) 43

Path-specific rules (frontend vs backend vs infra)
→ .github/instructions/*.instructions.md with applyTo globs (only applies to matching files) 40

Reusable workflows (“Skills”) (repeatable runbooks for how your team does work)
→ .github/skills/<skill-name>/SKILL.md (+ optional templates/scripts/examples)

Key difference: Instructions tell Copilot how to behave all the time. Skills teach Copilot how to execute a repeatable team workflow and are loaded only when relevant (“progressive loading”) .

2) Standard folder structure to enforce for the whole team
Put this in every repo (or in your engineering template repo):

text
repo-root/
├─ .github/
│  ├─ copilot-instructions.md
│  ├─ instructions/
│  │  ├─ backend.instructions.md
│  │  ├─ frontend.instructions.md
│  │  └─ testing.instructions.md
│  └─ skills/
│     ├─ secure-code-review/
│     │  ├─ SKILL.md
│     │  └─ checklist.md
│     ├─ test-case-generator/
│     │  ├─ SKILL.md
│     │  └─ examples/
│     └─ refactor-without-behavior-change/
│        └─ SKILL.md
└─ docs/
   ├─ coding-standards.md
   ├─ architecture.md
   └─ testing-strategy.md
Why this works:

Skills stay small and “on demand” while detailed standards live in docs/ and are referenced by link (better maintainability).
Everything is versioned and PR-reviewed, which matches your governance/traceability principles from the playbook.
3) The SKILL.md contract (what every team member must follow)
VS Code/Copilot expects each skill in its own folder with a required SKILL.md containing YAML frontmatter. The name must match the folder and should be lowercase with hyphens .

Minimal template (copy/paste)
md
---
name: <skill-name>
description: What the skill does + when to use it (keywords help discovery).
argument-hint: Optional: what input the user should provide.
user-invokable: true
disable-model-invocation: false
---

# <Skill Title>

## When to use
- ...

## Inputs you must ask for if missing
- ...

## Procedure (step-by-step)
1. ...
2. ...
3. ...

## Quality gates (Definition of Done)
- ...

## Output format
Return:
- ...
Important controls

disable-model-invocation: true → makes it manual-only (safer for high-impact skills like prod changes).
user-invokable: false → hides it from slash menu but still allows auto-load (good for background “style guardrails”).
4) The training approach: “Skills are runbooks, not essays”

A good skill has:
Trigger intent (“when to use it”)
Required context (what files/logs/inputs to gather)
Mandatory checks (security, tests, conventions)
Output contract (exact format expected)
Escalation (“if uncertain, ask questions / stop”)
That aligns directly with your playbook’s Skill blueprint guidance (trigger, inputs, checks, output, escalation).

5) 5 starter skills your team should build first (high ROI)
These map 1:1 to your playbook recommendations:

(A) secure-code-review
Use when PR touches auth, secrets, data access, external calls.
Output: findings by severity + exact remediation + pass/fail recommendation.

(B) test-case-generator
Use when adding features or fixing bugs.
Output: test plan + generated unit/integration tests aligned to your framework.

(C) api-contract-guardian
Use when changing API endpoints/schemas.
Output: compatibility analysis + contract tests + versioning recommendation.

(D) refactor-without-behavior-change
Use during cleanup.
Output: safe refactor plan + “no behavior change” verification steps.

(E) incident-root-cause-helper
Use when prod bug occurs.
Output: hypotheses + data to collect + minimal-risk fix strategy.

(You can start with 2 skills only in sprint 1: secure-code-review + test-case-generator.)

6) How they keep updating skills (continuous improvement loop)
Run this process monthly (lightweight, practical):

Collect “Copilot misses” from PR comments

“It didn’t follow our layering”
“Generated wrong test style”
“Missed validation rule”
For each miss, decide where it belongs:

Always-on rule → copilot-instructions.md
Path-specific rule → .github/instructions/*.instructions.md
Repeatable workflow → new/updated .github/skills/.../SKILL.md
Update skill with:
one new checklist item OR
one new example OR
one new “ask for missing inputs” question
PR review requirement:
Any change to .github/skills/** must be approved by Tech Lead / Architect
This keeps the skills “alive” and prevents huge unreadable files.

7) How developers actually use the skill day-to-day
In VS Code chat:

Type / and select the skill (Skills show as slash commands)
Add small context like service name + ticket ID + files to touch
Example usage:

/secure-code-review PR changes in auth middleware + token validation
/test-case-generator create unit tests for OrderPricingService edge cases
Also: skills can auto-load when the request matches the description keywords (that’s why the description should be keyword-rich and specific).

8) Governance guardrails (important for you as SA/Lead)
Based on your playbook principles (data minimization, accountability, traceability):

Add these lines inside every skill “Boundaries” section:

Don’t paste secrets/PII/customer data into chat
Do not change API contracts unless explicitly asked
Always produce tests or a test plan
If confidence is low: ask questions and stop