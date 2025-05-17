# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button"
```

# Config
## apps/api
Add 2 keys: 
```
OPENAI_API_KEY=Your open ai api key
PORT=Your port || 3001
```

## apps/web
Add 1 key: 
```
NEXT_PUBLIC_API_URL=http://localhost:3001 (make sure port is the same with api port)
```

# Events can be occur:
## Open AI:
- out of quota
- timeout
- response format can be changed
- prompt injection
- sensitive content -> rejected

## Nestjs:
- currently we didn't validate payload which may cause prompt injection
- too many requests at once: may cause bottleneck or rate limit from OpenAI

## Nextjs:
- need to handle a case where api is offline
- need to debounce submit button to reduce spam call