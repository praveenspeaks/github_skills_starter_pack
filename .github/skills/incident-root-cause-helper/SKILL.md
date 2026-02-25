---
name: incident-root-cause-helper
description: Root-cause analysis workflow for production or UAT incidents across .NET backend and Angular frontend. Use when you have an error, stack trace, logs, correlation ID, or user steps and need a safe fix + regression tests.
argument-hint: "[symptom] [error/log snippet] [area: api|ui|db]"
user-invokable: true
disable-model-invocation: false
---

# Incident Root Cause Helper (.NET + Angular)

## When to use
- Production/UAT incident triage.
- Intermittent defects, performance spikes, 500s, UI errors, failed API calls.
- Need a minimal-risk patch and a regression test plan.

## Governance / safety
- Do not paste secrets/PII. Prefer masked/synthetic samples.
- Do not propose risky broad refactors during incident fixes.
- Preserve traceability: capture hypothesis, evidence, and fix decision in ticket/PR.

## Inputs to gather (ask if missing)
- Incident summary: who/what/when/impact.
- Repro steps (UI clicks, API calls), expected vs actual.
- Logs (masked), stack traces, correlation/trace IDs.
- Versions: backend release, frontend build, environment.
- Recent deployments/feature flags.
- Observability: metrics (latency, error rate), DB timeouts, external dependency status.

## Procedure
1. **Restate symptom and impact**
2. **Create hypotheses**
   - List 3–7 plausible causes grouped by layer: UI/API/DB/External/Config.
3. **Evidence plan**
   - For each hypothesis, define what evidence would confirm/deny (logs, metrics, code path).
4. **Fast reproduction strategy**
   - Local repro, test env, or targeted unit test reproduction.
5. **Narrow to root cause**
   - Identify exact failing condition, not just failing line.
6. **Fix strategy**
   - Minimal change, guarded by validation and safe error handling.
   - Consider rollback/feature-flag mitigations if needed.
7. **Regression tests**
   - Add a deterministic test that fails before the fix and passes after.
8. **Post-fix checks**
   - Monitoring/alerts, dashboards, and release notes.

## Output format
### Incident summary
- Symptom:
- Impact:
- Suspected area:

### Hypotheses (ranked)
1. ...
2. ...

### Evidence to collect
- ...

### Proposed fix (minimal-risk)
- Files to change:
- Change description:
- Rollback/mitigation:

### Regression tests
- Test type:
- Cases:

### PR/Ticket notes (copy/paste)
- Evidence:
- Root cause:
- Fix:
- Tests added:
