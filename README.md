# Directed Connect Storybook Library

Directed Connect is a fintech-focused component library and page shell built with React 18, TypeScript (strict mode), Tailwind CSS v3, Radix UI, React Hook Form, Zod, and Storybook.

## Stack

- React 18 + TypeScript
- Tailwind CSS v3 with tokenized fintech theme
- Storybook 8 (`@storybook/react-vite`, essentials, a11y, interactions, viewport, themes)
- React Hook Form + Zod validation
- React Router v6
- Framer Motion
- Lucide icons
- Radix primitives (select, dialog, tooltip, checkbox, radio, avatar, separator, progress, switch)

## Design Tokens

Configured in `tailwind.config.ts`:

- `primary`: `#EF5139` (+ hover/active)
- `background`: `#f9fafb`
- `surface`: `#ffffff`
- `text-primary`: `#111928`
- `text-secondary`: `#6b7280`
- `border`: `#e5e7eb`
- `success`: `#057a55`
- `error`: `#e02424`
- font family: `Inter`
- spacing aligned to 4px grid
- custom radius and shadow tokens

## Setup

```bash
yarn install --ignore-engines
```

## Run App

```bash
yarn dev
```

## Run Storybook

```bash
yarn storybook
```

## Quality Checks

```bash
yarn typecheck
yarn lint
yarn build
yarn build-storybook
```

## Structure

Key directories:

- `src/components/ui` - design-system atoms and primitives
- `src/components/layout` - sidebar, header, wrapper
- `src/components/dashboard` - account banner/list/cards
- `src/components/forms` - dynamic form engine
- `src/components/pages` - routed pages
- `src/data/formSchemas` - self-directed (16), invest/manage/accounts/contributions/rollover schemas
- `src/stories` - Storybook stories by category

## Notes

- Figma MCP access was unavailable in this environment; design implementation follows provided tokens and fintech layout patterns.
- Storybook includes mobile/tablet/desktop viewport presets and a light/dark class toggle.
