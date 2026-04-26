# Contributing to DORA: The Compliance Roguelike

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

## Ways To Contribute

- New regulatory cards for DORA, NIS2, GDPR, or ISO 27001.
- Regulator dialogue lines with real article references.
- Localized regulator packs.
- Difficulty modes.
- Visual improvements to the Regulator silhouette.

## Card Writing Rules

Every regulatory defense card should reference a real regulation and have an effect that matches the control intent. The Coffee Break card is the only exception.

## Validation

Run both checks before opening a PR:

```bash
npm test
npm run build
```
