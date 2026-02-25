# Example: Angular XSS / DOM safety review notes (template)

## Context
- Component displays HTML from API: `termsAndConditionsHtml`

## Checks
- Do not bind raw HTML via `[innerHTML]` unless sanitized.
- Prefer returning structured data and rendering with Angular templates.
- If HTML is unavoidable:
  - sanitize server-side and client-side
  - never use `DomSanitizer.bypassSecurityTrustHtml` on untrusted data

## Example finding
- Severity: Critical
- Location: `terms.component.html`
- Issue: `[innerHTML]="termsAndConditionsHtml"` with untrusted server content can enable stored XSS.
- Recommendation:
  - Change API to return structured model OR sanitize content and document trust boundary.
  - Add e2e test that verifies script tags are not executed.
