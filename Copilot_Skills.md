Copilot Skills: A Reference Manual for Modern Development

1. Foundations: The Hierarchy of Copilot Customization

To enforce engineering excellence at scale, customization is managed through a three-tiered hierarchy. This ensures Copilot possesses high-precision context without degrading performance through "context bloat."

Level Name	File Location	Scope (When it applies)	"So What?" (Primary Benefit)
Always-on Repo Rules	.github/copilot-instructions.md	Automatically active in all chat/agent contexts.	Enforces global coding styles and "don’t do" rules across the entire project.
Path-specific Rules	.github/instructions/*.instructions.md	Targets specific file patterns using applyTo globs.	Tailors AI behavior for specific tech stacks (e.g., .NET vs. Angular).
Reusable Workflows (Skills)	.github/skills/<skill-name>/SKILL.md	Loaded only when explicitly invoked or when keywords match.	Provides repeatable, high-fidelity runbooks for complex team-specific tasks.

Defining Instructions vs. Skills

The distinction is behavioral vs. procedural:

* Instructions are mandatory guardrails. They define how Copilot must behave (e.g., "Always use xUnit for .NET tests").
* Skills are repeatable workflows. They teach Copilot how to execute a specific job (e.g., "Perform a backward-compatibility analysis on this API change").

Understanding this hierarchy is the baseline; mastering how Copilot manages these resources efficiently is the key to operational speed.


--------------------------------------------------------------------------------


2. The Mechanics of Efficiency: Progressive Loading

To maintain speed and prevent the context window from becoming "noisy," Copilot utilizes Progressive Loading. This tiered approach ensures the system only processes what is necessary for the current task.

1. Level 1: Metadata Active: Copilot constantly monitors the names and descriptions of all available skills. This is a lightweight "index" kept in memory.
2. Level 2: Context Match: When your prompt matches a skill’s description keywords, Copilot loads the full body of the SKILL.md file.
3. Level 3: Reference on Demand: Copilot only pulls in template scripts and files located in the skill's examples/ folder when they are explicitly referenced or needed for the generation.

[!IMPORTANT] The Golden Rule: Skills must stay small and focused on "on-demand" workflows. Detailed engineering standards must live in the docs/ folder and be referenced by link to ensure the human-in-the-loop maintenance model remains sustainable.


--------------------------------------------------------------------------------


3. Repository Architecture: The Skills Blueprint

Standardization is mandatory for team-wide adoption. These skills are instantly available to every developer upon cloning the repository.

repo-root/
└── .github/
    └── skills/
        ├── secure-code-review/           <-- Must be lowercase-hyphenated
        │   ├── SKILL.md
        │   └── checklist.md
        ├── test-case-generator/
        │   ├── SKILL.md
        │   └── examples/                 <-- Reference patterns (Level 3)
        └── refactor-without-behavior-change/
            └── SKILL.md


The SKILL.md Contract

Every skill folder must contain a SKILL.md file with specific YAML frontmatter. This is the "contract" between the engineer and the AI:

* name: Must match the folder name exactly (lowercase with hyphens).
* description: A keyword-rich explanation of what the skill does. This is the primary driver for auto-loading.
* argument-hint: Guidance on required inputs (e.g., "target service file").
* user-invokable: If true, the skill appears in the / slash menu. If false, it acts as a background "style guardrail."
* disable-model-invocation: If true, the skill is manual-only. Use this for high-impact tasks (like production-bound fixes) to prevent the AI from triggering the workflow without explicit human intent.


--------------------------------------------------------------------------------


4. Triggering Workflows: Slash Commands & Auto-Loading

Manual Trigger (Slash Commands)

The primary method for invoking a team runbook. Type / in Copilot Chat to select your tool.

* Example: /secure-code-review AuthMiddleware.cs
* Example: /test-case-generator OrderPricingService.cs - edge cases
* Example: /api-contract-guardian CreateOrderDto.cs

Auto-Load (Contextual Trigger)

Copilot automatically matches natural language prompts against skill descriptions.

What you type	Copilot auto-loads
"Review this .NET middleware for security issues"	secure-code-review
"Write unit tests for this Angular component"	test-case-generator
"I changed this DTO, check for breaking changes"	api-contract-guardian
"Clean up this class without changing behavior"	refactor-without-behavior-change


--------------------------------------------------------------------------------


5. The Essential Skill Catalog (High ROI)

secure-code-review

* When to use: Before merging PRs touching auth, tokens, data access, or secrets.
* Expected Output: A severity-ranked findings list (🔴 HIGH / 🟡 MEDIUM / 🟢 LOW), exact remediation steps, and a final Pass/Fail verdict.
* Pro-Tip: Enforces security by checking for missing [Authorize] attributes and unsafe logging of PII.

test-case-generator

* When to use: New features, bug fixes, or untested legacy logic.
* Expected Output: A comprehensive test plan and generated code using xUnit/Moq (for .NET) or Jasmine/Angular Testing Library (for Angular).
* Pro-Tip: Demand deterministic tests; reject any output that includes flaky network or timing assumptions.

api-contract-guardian

* When to use: Any change to a DTO, endpoint signature, or API response shape.
* Expected Output: Backward-compatibility analysis, versioning recommendations, and ProblemDetails usage checks.
* Pro-Tip: Identify if adding a "required" field to a .NET DTO will break the existing Angular consumer.

refactor-without-behavior-change

* When to use: Cleanup sprints or technical debt reduction.
* Expected Output: Generation of "characterization tests" to lock in current behavior followed by the proposed refactor plan.
* Pro-Tip: This ensures that "cleaner code" does not accidentally alter established business rules.

incident-root-cause-helper

* When to use: Triage for production bugs or 500 errors.
* Expected Output: Ranked hypotheses, list of specific data to collect, and a minimal-risk fix strategy.
* Pro-Tip: Move from "guessing" to data-driven triage by providing sanitized stack traces and logs.


--------------------------------------------------------------------------------


6. Operational Excellence: The Developer Daily Flow

The 6-Part Prompting Framework

80% of AI value is determined by the prompt. Every complex request must follow this structure:

1. Role: "You are a .NET 8 backend engineer."
2. Goal: "Add validation to the CreateUserCommand."
3. Context: "We use CQRS; the DTO is in Users/Commands/."
4. Boundaries: "Do not modify the controller; no breaking API changes."
5. Acceptance: "All xUnit tests must pass; cover the 'missing email' case."
6. Output: "Provide a minimal diff and a short rationale."

Model Tier Strategy

Choose the model based on the complexity of the task:

* ⚡ Fast: Autocomplete, simple renames, or doc comments.
* ⚖️ Balanced: Default for most features (CRUD, new endpoints, tests).
* 🧠 Deep Reasoning: Complex debugging, security reviews, or high-risk refactors.

Data Safety Guardrails

[!WARNING] Data Minimization is Mandatory.

* NEVER paste: Credentials, API Keys, Customer PII, or Production Database Content.
* SAFE to use: Sanitized samples, synthetic/masked data, and generic code patterns.


--------------------------------------------------------------------------------


7. Maintaining the Edge: The Improvement Loop

Skills are dynamic artifacts. They must be updated to prevent the "re-emergence" of poor patterns.

1. Identify Misses: During PR reviews, note where Copilot failed to follow a team standard (e.g., "Generated wrong test style").
2. Update the Source:
  * If the miss is global \rightarrow Update copilot-instructions.md.
  * If it is stack-specific \rightarrow Update the .instructions.md file (e.g., frontend.instructions.md).
  * If it is procedural \rightarrow Update the SKILL.md checklist or add a new file to the examples/ folder.
3. Governance: All changes to the .github/skills/ directory MUST be approved by a Tech Lead or Architect.

The Escalation Policy: If AI confidence is low, or if the logic is ambiguous: ask questions and stop. Never "blind-merge" AI output.

Quick Reference Card

╔══════════════════════════════════════════════════════════╗
║           COPILOT SKILLS — QUICK REFERENCE               ║
╠══════════════════════════════════════════════════════════╣
║  /secure-code-review      → Review Auth/Data changes     ║
║  /test-case-generator     → xUnit/Moq or Jasmine/ATL     ║
║  /api-contract-guardian   → Check for breaking API gaps  ║
║  /incident-root-cause-helper → Triage production bugs    ║
║  /refactor-without-behavior-change → Safe cleanup        ║
╠══════════════════════════════════════════════════════════╣
║  CORE RULES:                                             ║
║  1. Review all AI output before merging (You own it).    ║
║  2. No Secrets or PII in prompts (Sanitize everything).  ║
║  3. Log AI usage in your PR description for traceability.║
║  4. One sprint miss = one improvement to a skill.        ║
╚══════════════════════════════════════════════════════════╝
