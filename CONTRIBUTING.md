# Contributing to WC Toolkit CEM Sorter

Thank you for your interest in contributing to the WC Toolkit CEM Sorter! We welcome contributions from the community and are grateful for any help you can provide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **pnpm**: This project uses pnpm as the package manager
- **Git**: For version control

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/wc-toolkit/cem-sorter
cd cem-sorter
```

## Development Setup

1. Install dependencies:

```bash
pnpm install
```

2. Build the project:

```bash
pnpm run build
```

3. Run tests to ensure everything is working:

```bash
pnpm run test
```

## Making Changes

### Branch Naming

Create a descriptive branch name for your changes:

- `feature/add-new-sorting-option`
- `fix/handle-undefined-names`
- `docs/update-readme-examples`
- `refactor/improve-performance`

### Development Workflow

1. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes in the `src/` directory

3. Build and test your changes:

```bash
pnpm run build
pnpm run test
```

4. Run the demo to test functionality:

```bash
pnpm run demo
```

5. Lint and format your code:

```bash
pnpm run lint:fix
pnpm run format
```

### Available Scripts

- `pnpm run build` - Build the TypeScript source to JavaScript
- `pnpm run test` - Run the test suite
- `pnpm run lint` - Check for linting errors
- `pnpm run lint:fix` - Fix automatically fixable linting errors
- `pnpm run format` - Format code with Prettier
- `pnpm run demo` - Run the demo script
- `pnpm run clean` - Clean build artifacts

## Testing

### Running Tests

```bash
pnpm run test
```

### Writing Tests

- Tests are located in `src/cem-sorter.test.ts`
- We use [Vitest](https://vitest.dev/) as our testing framework
- Write tests for any new functionality or bug fixes
- Ensure all tests pass before submitting your PR

### Test Structure

```typescript
import { describe, it, expect } from "vitest";
import { sortCem } from "./cem-sorter.js";

describe("your feature", () => {
  it("should do something specific", () => {
    // Arrange
    const manifest = createMockManifest();
    
    // Act
    const result = sortCem(manifest, options);
    
    // Assert
    expect(result).toEqual(expectedResult);
  });
});
```

## Code Style

### ESLint and Prettier

This project uses ESLint for linting and Prettier for code formatting. The configuration is already set up, and you can run:

```bash
pnpm run lint:fix
pnpm run format
```

### TypeScript Guidelines

- Use strict TypeScript settings
- Provide proper type annotations for public APIs
- Use meaningful variable and function names
- Add JSDoc comments for public functions

### Code Quality

- Keep functions small and focused
- Use descriptive commit messages
- Write clear, self-documenting code
- Add comments for complex logic

## Submitting Changes

### Pull Request Process

1. **Update Documentation**: Ensure any new features are documented in the README.md

2. **Add Tests**: Include tests for new functionality

3. **Update Changelog**: Add an entry describing your changes

4. **Create Pull Request**: 
   - Use a descriptive title
   - Include a detailed description of changes
   - Reference any related issues
   - Include screenshots if applicable

## Release Process

This project uses [Changesets](https://github.com/changesets/changesets) for version management and publishing.

When making changes to the repo, be sure to add a changeset. Once it's merged into main, it will automatically trigger a release.

```bash
pnpm changeset add
```

## Questions or Issues?

- **Bug Reports**: Create an issue using the bug report template
- **Feature Requests**: Create an issue using the feature request template
- **Questions**: Start a discussion in the GitHub Discussions section
- **Security Issues**: Email the maintainers directly (see SECURITY.md if available)

Thank you for contributing to WC Toolkit CEM Sorter! 🎉
