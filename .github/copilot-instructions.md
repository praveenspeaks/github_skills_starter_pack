# Copilot Instructions (Repo-Wide)

These rules apply to all Copilot responses in this repository.

## Goals
- Produce accurate, practical help aligned to the workshop artifacts in this repo.
- Prefer clear, minimal changes over large refactors.
- Ask for missing context before making risky assumptions.

## General Behavior
- Be concise and structured; avoid long essays.
- When a task is ambiguous, ask targeted questions and propose a default.
- Do not introduce new dependencies without an explicit request.
- Do not change API contracts or public interfaces unless explicitly asked.
- Avoid copying large blocks of text from sources; summarize instead.

## Quality and Safety
- Always include a short test plan or verification steps when code is changed.
- Highlight potential risks or breaking changes.
- Do not include secrets, keys, or PII in outputs. If such data is present in input, redact it.

## Documentation and Artifacts
- Keep guidance consistent with the playbook content in this repo.
- If a topic belongs in a skill or path-specific instruction, suggest the correct artifact:
  - Always-on rules: .github/copilot-instructions.md
  - Path-specific rules: .github/instructions/*.instructions.md
  - Repeatable workflows: .github/skills/<skill-name>/SKILL.md

## Boundaries
- If confidence is low or inputs are missing, ask questions and stop.
- Do not perform destructive actions without explicit confirmation.
