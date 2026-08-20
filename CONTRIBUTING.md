# Contributing to Serendipity Maps

Thank you for your interest in making human connection more serendipitous.

## Quick Start

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies: `npm install`
4. **Create a branch**: `git checkout -b feature/your-feature-name`
5. **Commit** with clear messages: `git commit -m 'Add serendipity window animation'`
6. **Push** to your fork: `git push origin feature/your-feature-name`
7. **Open a Pull Request** against `main`

## Development

```bash
npm run dev        # Start dev server on port 3000
npm run build      # Production build
npm run lint       # Run ESLint
```

## Code Style

- TypeScript strict mode
- Functional React components
- Tailwind CSS utility classes (no custom CSS unless necessary)
- File naming: PascalCase for components, camelCase for utilities
- Components go in `src/components/serendipity/sections/`

## Design Principles

When contributing, keep these in mind:

1. **Zero-Choice Interface** — Never add a decision the user has to make
2. **Invisibility by Default** — If it can be felt but not seen, it's right
3. **Post-Hoc Revelation** — Show information after the moment, not before
4. **Graceful Decay** — Everything expires. Nothing pressures.

## Reporting Issues

- Use GitHub Issues with the appropriate template
- Include OS, browser, and Node.js version
- Add screenshots if applicable
- Describe steps to reproduce

## Pull Request Guidelines

- Keep PRs focused on a single concern
- Include a description of what changed and why
- Test on mobile viewport (390x844) before submitting
- Ensure dark theme consistency
- No merge commits — use rebase or squash

## Questions?

Open a GitHub Discussion or reach out to the maintainer.
