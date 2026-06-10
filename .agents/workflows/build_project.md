# Build Project Workflow — Healthsync Medical Solutions

## Prerequisites
- Node.js >= 20 installed (project uses v22 per `.idx/dev.nix`)
- Run from: `c:\Users\Asus\Downloads\project`

## Step 1: Install Dependencies

```powershell
npm install
```

## Step 2: Build the Project

```powershell
npm run build
```

> **Note**: The `build` script uses `cross-env NODE_ENV=production next build`. This is Windows-compatible thanks to the `cross-env` package.

## Step 3: Verify Build Output

After build completes, look for:
- ✅ `✓ Compiled successfully` in the output
- A `.next/` folder created in the project root
- No TypeScript errors (errors are suppressed in `next.config.ts` `ignoreBuildErrors: true`)

## Common Build Issues

| Issue | Fix |
|---|---|
| `cross-env: command not found` | Run `npm install` first |
| Image domains error | Add hostname to `next.config.ts` `remotePatterns` |
| Missing GEMINI_API_KEY | Set in `.env` file — AI features will be disabled without it |
