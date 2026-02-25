🛠️ Complete Guide: How to Use Your Skills with Copilot
Step-by-step — for your .NET + Angular development team
🔵 PART 1 — One-Time Setup (Do This First)
Step 1 — Commit the skills folder to your repo
objectivec
your-repo/
└── .github/
    └── skills/
        ├── secure-code-review/
        │   ├── SKILL.md
        │   └── examples/
        ├── test-case-generator/
        │   ├── SKILL.md
        │   └── examples/
        ├── api-contract-guardian/
        │   ├── SKILL.md
        │   └── examples/
        ├── incident-root-cause-helper/
        │   ├── SKILL.md
        │   └── examples/
        └── refactor-without-behavior-change/
            ├── SKILL.md
            └── examples/
✅ Once pushed, every developer who clones the repo gets all 5 skills automatically — no extra installation needed.

Step 2 — Enable Agent Skills in VS Code
Open VS Code
Press Ctrl + , → search chat.agentSkillsLocations
Verify .github/skills is in the list (it is by default)
Open Copilot Chat panel (Ctrl + Alt + I)
Switch to Agent Mode using the dropdown at the top of chat
markdown
┌─────────────────────────────────────┐
│  Copilot Chat                    ⚙️ │
│  Mode: [ Ask ▼ ]  ← change to Agent│
│  __________________________________ │
│  Type / to see available skills...  │
└─────────────────────────────────────┘
Step 3 — Verify Skills Are Loaded
Type / in the chat input — you should see all 5 skills appear in the menu:

bash
/secure-code-review
/test-case-generator
/api-contract-guardian
/incident-root-cause-helper
/refactor-without-behavior-change
💡 Tip: If skills don't appear, type /skills to open the Configure Skills menu directly.

🟢 PART 2 — How the Skills Load (3 Levels — No Context Waste)
Copilot is smart about what it loads — it uses Progressive Loading:

sql
┌────────────────────────────────────────────────────────────┐
│                    PROGRESSIVE LOADING                     │
│                                                            │
│  Level 1 → Always active                                   │
│            Copilot reads name + description of all skills  │
│            (lightweight, always in memory)                 │
│                          ↓                                 │
│  Level 2 → On match                                        │
│            When your prompt matches a skill's description, │
│            Copilot loads the full SKILL.md body            │
│                          ↓                                 │
│  Level 3 → On demand                                       │
│            Copilot pulls examples/ files only if needed    │
│            (never loads unless referenced)                 │
└────────────────────────────────────────────────────────────┘
Why this matters for your team:
You can have all 5 skills installed and Copilot only loads what's relevant — keeping the context window clean and fast.

🟡 PART 3 — Two Ways to Invoke a Skill
Method 1 — Manual (Slash Command) ← Most Common
Type / in Copilot Chat and pick the skill, then add context:

bash
/secure-code-review  AuthController.cs PR #42
/test-case-generator  OrderPricingService.cs - edge cases for discount logic
/api-contract-guardian  changed CreateOrderDto - added ShippingAddress field
/refactor-without-behavior-change  UserRepository.cs - extract query methods
/incident-root-cause-helper  NullReferenceException in PaymentService prod logs
Method 2 — Auto-Load (Copilot Decides) ← Happens Automatically
When you describe a task naturally, Copilot reads your prompt, matches keywords in the skill description, and auto-loads the right skill silently:

What you type	Copilot auto-loads
"Review this middleware for security issues"	secure-code-review
"Write unit tests for this service class"	test-case-generator
"I changed this DTO, is the API safe?"	api-contract-guardian
"We have a prod 500 error, help me investigate"	incident-root-cause-helper
"Clean up this class without breaking anything"	refactor-without-behavior-change
🔴 PART 4 — Each Skill in Action (.NET + Angular Examples)
🔒 Skill 1: secure-code-review
When to use: Before merging any PR that touches auth, tokens, data access, API calls, or secrets.

bash
/secure-code-review
AuthService.cs + JwtMiddleware.cs changed in PR #88
Check for hardcoded secrets, missing auth checks, and unsafe logging
What Copilot will do:

Load secure-code-review/SKILL.md
Pull examples/dotnet_api_authz_review.md + angular_xss_review.md
Return a severity-ranked findings list + exact remediation per finding + Pass/Fail verdict
Sample Output:

arduino
🔴 HIGH   - JWT secret read from appsettings.json → move to Azure Key Vault
🟡 MEDIUM - Missing [Authorize] on /api/users/export endpoint
🟢 LOW    - Console.log(token) in Angular AuthService → remove before merge

Verdict: ❌ FAIL — resolve HIGH before merge
🧪 Skill 2: test-case-generator
When to use: Any new feature, bug fix, or untested method in .NET or Angular.

scss
/test-case-generator
OrderPricingService.cs → CalculateDiscount() method
Use xUnit + Moq, cover: valid discount, expired coupon, zero-value cart
What Copilot will do:

Load test-case-generator/SKILL.md
Pull examples/dotnet_xunit_service_test.cs as a reference pattern
Generate a full xUnit test class matching your team's naming & structure conventions
Sample Output:

csharp
public class OrderPricingServiceTests
{
    private readonly Mock<ICouponRepository> _couponRepo;
    private readonly OrderPricingService _sut;

    public OrderPricingServiceTests()
    {
        _couponRepo = new Mock<ICouponRepository>();
        _sut = new OrderPricingService(_couponRepo.Object);
    }

    [Fact]
    public void CalculateDiscount_ValidCoupon_ReturnsDiscountedPrice() { ... }

    [Fact]
    public void CalculateDiscount_ExpiredCoupon_ThrowsCouponExpiredException() { ... }

    [Fact]
    public void CalculateDiscount_ZeroValueCart_ReturnsZero() { ... }
}
For Angular:

scss
/test-case-generator
product-list.component.ts → ngOnInit() data loading
Use Jasmine + Angular Testing Library
🛡️ Skill 3: api-contract-guardian
When to use: Any time a DTO, endpoint signature, or response shape changes.

vbnet
/api-contract-guardian
CreateOrderDto.cs — added required field: ShippingAddress (string)
Consumers: Angular OrderService + external WMS integration
What Copilot will do:

Load api-contract-guardian/SKILL.md
Pull examples/dto_change_checklist.md + angular_service_consumer_example.ts
Return backward-compatibility analysis + Angular consumer update plan + versioning recommendation
Sample Output:

vbnet
⚠️  BREAKING CHANGE DETECTED

ShippingAddress is required but existing consumers send no value
→ Existing Angular OrderService will fail validation on POST /api/orders

Recommended fix:
  Option A: Make ShippingAddress optional with [JsonIgnore] default → Non-breaking
  Option B: Version the endpoint → /api/v2/orders              → Clean but needs routing
  Option C: Add migration script for existing records           → For DB impact only

Angular update needed in:
  → src/app/orders/services/order.service.ts (line 34)
  → src/app/orders/models/create-order.model.ts
🐛 Skill 4: incident-root-cause-helper
When to use: Production bugs, 500 errors, unexpected behavior in live environment.

sql
/incident-root-cause-helper
NullReferenceException in PaymentService.ProcessPayment()
Stack trace: [paste trace]
Logs from last 2 hours show it fails only for orders > €10,000
What Copilot will do:

Load incident-root-cause-helper/SKILL.md
Pull examples/dotnet_exception_triage.md
Return ranked hypotheses + data to collect + minimal-risk fix strategy
Sample Output:

sql
Hypotheses (ranked by likelihood):
1. 🔴 HIGH  — CurrencyConverter dependency is null for large orders
              → Check DI registration for ICurrencyConverter scope
2. 🟡 MED   — Order.TaxCalculation returns null above threshold
              → Add null guard + unit test for >€10k scenario
3. 🟢 LOW   — Database timeout causing partial object hydration

Next steps:
  1. Add null check + log at PaymentService.cs line 87
  2. Reproduce with unit test: ProcessPayment_LargeOrder_ShouldNotThrow()
  3. Deploy with feature flag — test on staging before full rollout
♻️ Skill 5: refactor-without-behavior-change
When to use: Cleanup sprints, tech debt, or code readability improvements.

arduino
/refactor-without-behavior-change
UserRepository.cs — extract 3 inline query methods into private helpers
No logic changes, no new features
What Copilot will do:

Load refactor-without-behavior-change/SKILL.md
Pull examples/dotnet_characterization_test.md + angular_refactor_checklist.md
Generate characterization tests first, then the safe refactor plan, then PR description
Sample Output:

csharp
Step 1 → Characterization tests generated (lock current behavior)
Step 2 → Safe extraction plan:
  - GetActiveUsers() → extracted from lines 45–67
  - GetUsersByRole()  → extracted from lines 89–112
  - GetExpiredUsers() → extracted from lines 134–156
Step 3 → Verify: all existing tests pass with zero changes
Step 4 → PR description template filled ✅
🟣 PART 5 — Daily Workflow: How Developers Should Use This
vbnet
┌─────────────────────────────────────────────────────────────┐
│                   DEVELOPER DAILY FLOW                      │
│                                                             │
│  1. Pick up ticket                                          │
│     ↓                                                       │
│  2. Choose Mode + Model (from cheat sheet)                  │
│     ↓                                                       │
│  3. Write prompt using 6-part template                      │
│     ↓                                                       │
│  4. Invoke skill with /slash command OR let Copilot         │
│     auto-load based on your natural description             │
│     ↓                                                       │
│  5. Review output → NEVER blind-merge                       │
│     ↓                                                       │
│  6. Run tests → green? → proceed                            │
│     ↓                                                       │
│  7. PR notes → document AI usage + key decisions            │
│     ↓                                                       │
│  8. If skill gave wrong/incomplete output →                 │
│     update SKILL.md or examples/ in a PR                    │
└─────────────────────────────────────────────────────────────┘
⚙️ PART 6 — How Developers Update Skills (Continuous Improvement)
This is the most powerful habit to build. Skills improve like code:

sql
Sprint Retro / PR Review
        ↓
"Copilot missed something?" → where does the fix go?
        ↓
┌───────────────────────────────────────┐
│  Always wrong for all files?          │
│  → Update copilot-instructions.md     │
├───────────────────────────────────────┤
│  Wrong only for .NET or Angular?      │
│  → Update .github/instructions/       │
│    backend.instructions.md            │
│    frontend.instructions.md           │
├───────────────────────────────────────┤
│  Wrong for a specific workflow?       │
│  → Update .github/skills/<name>/      │
│    SKILL.md (add checklist item)      │
│    examples/ (add a real example)     │
└───────────────────────────────────────┘
        ↓
Raise a PR → Tech Lead reviews → Merged → 
Team benefits immediately on next pull
Golden rule for updating skills:
One sprint miss = one improvement to a skill. Keep changes small and specific.

📋 Quick Reference Card (Pin in Teams/Slack)
sql
╔══════════════════════════════════════════════════════════╗
║           COPILOT SKILLS — QUICK REFERENCE               ║
╠══════════════════════════════════════════════════════════╣
║  /secure-code-review      → Before merging auth/API PRs  ║
║  /test-case-generator     → New feature or bug fix       ║
║  /api-contract-guardian   → DTO or endpoint changes      ║
║  /incident-root-cause-helper → Production bugs           ║
║  /refactor-without-behavior-change → Cleanup tasks       ║
╠══════════════════════════════════════════════════════════╣
║  RULES                                                   ║
║  ✅ Always review AI output before merging               ║
║  ✅ Add tests for every AI-generated change              ║
║  ✅ Log AI usage in PR description                       ║
║  ❌ Never paste secrets/PII into Copilot                 ║
║  ❌ Never skip the skill — it enforces team standards    ║
╠══════════════════════════════════════════════════════════╣
║  IMPROVE A SKILL                                         ║
║  1. Find a miss in PR review                             ║
║  2. Update SKILL.md or examples/                         ║
║  3. Raise PR → Tech Lead approves → Done                 ║
╚══════════════════════════════════════════════════════════╝