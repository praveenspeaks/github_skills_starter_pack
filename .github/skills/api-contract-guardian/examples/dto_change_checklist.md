# DTO Change Checklist (example)

## Safe additive changes
- Add new optional field with default handling on client
- Add new enum value (client should handle unknown gracefully)

## Likely breaking changes
- Remove field
- Rename field
- Change type (string -> number)
- Change nullability (nullable -> required)
- Change date formatting / timezone assumptions
- Change pagination defaults

## Angular consumer tips
- Use typed interfaces but guard at runtime when possible
- Make UI resilient to unknown enum values (fallback label)
