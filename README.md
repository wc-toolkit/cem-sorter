<div align="center">
  
![workbench with tools, html, css, javascript, and jsx logos](https://raw.githubusercontent.com/wc-toolkit/jsx-types/refs/heads/main/assets/wc-toolkit_jsx.png)

</div>

# WC Toolkit CEM Sorter

A utility for sorting Custom Elements Manifest (CEM) files alphabetically. This package helps maintain consistent and organized custom elements manifests by sorting modules, declarations, members, attributes, events, and other properties in alphabetical order.

## Features

- **Alphabetical Sorting**: Sorts all manifest properties alphabetically for better organization
- **Module Organization**: Sorts modules by file path
- **Declaration Sorting**: Organizes component declarations and exports
- **Member Sorting**: Sorts attributes, properties, methods, events, slots, CSS properties, and more
- **Optional Deprecated Field Sorting**: Option to move deprecated APIs to the end of lists
- **Custom Fields**: Support for sorting custom fields
- **Debug Logging**: Optional debug output for troubleshooting

## Installation

```bash
npm i -D @wc-toolkit/cem-sorter
```

## Usage

### Standalone Function

```javascript
import { sortCem } from "@wc-toolkit/cem-sorter";
import manifest from "./custom-elements.json" with { type: "json" };

// Basic usage
const sortedManifest = sortCem(manifest);

// With options
const sortedManifest = sortCem(manifest, {
  fileName: "sorted-custom-elements.json",
  outdir: "./dist",
  deprecatedLast: true,
  debug: true,
});
```

### As a Custom Elements Analyzer Plugin

```javascript
// custom-elements-manifest.config.js
import { cemSorterPlugin } from "@wc-toolkit/cem-sorter";

export default {
  globs: ["src/**/*.js"],
  outdir: "./dist",
  plugins: [
    cemSorterPlugin({
      deprecatedLast: true,
      customFields: ["customProperty"],
    }),
  ],
};
```

## Configuration Options

| Option           | Type       | Default                  | Description                                               |
| ---------------- | ---------- | ------------------------ | --------------------------------------------------------- |
| `fileName`       | `string`   | `"custom-elements.json"` | Name of the output file                                   |
| `outdir`         | `string`   | `"./"`                   | Path to output directory                                  |
| `deprecatedLast` | `boolean`  | `false`                  | Move deprecated APIs to the end of their respective lists |
| `customFields`   | `string[]` | `[]`                     | Additional custom fields to sort                          |
| `skip`           | `boolean`  | `false`                  | Skip sorting entirely                                     |
| `debug`          | `boolean`  | `false`                  | Enable debug logging                                      |

## What Gets Sorted

The sorter organizes the following elements in your Custom Elements Manifest:

### Top Level

- **Modules**: Sorted by file path
- **Exports**: Sorted alphabetically by name
- **Declarations**: Sorted alphabetically by name

### Within Declarations

- **Members**: All members (properties, methods, attributes, etc.)
- **Attributes**: Component attributes
- **Events**: Custom events
- **Slots**: Available slots
- **CSS Custom Properties**: CSS custom properties/variables
- **CSS Parts**: CSS shadow parts
- **CSS States**: CSS custom states
- **Dependencies**: Component dependencies
- **Custom Fields**: Any additional fields specified in options

## Examples

### Before Sorting

```json
{
  "modules": [
    {
      "path": "src/components/z-component.js",
      "declarations": [
        {
          "name": "ZComponent",
          "members": [
            { "name": "zProperty" },
            { "name": "aProperty" },
            { "name": "mMethod" }
          ]
        }
      ]
    },
    {
      "path": "src/components/a-component.js"
    }
  ]
}
```

### After Sorting

```json
{
  "modules": [
    {
      "path": "src/components/a-component.js"
    },
    {
      "path": "src/components/z-component.js",
      "declarations": [
        {
          "name": "ZComponent",
          "members": [
            { "name": "aProperty" },
            { "name": "mMethod" },
            { "name": "zProperty" }
          ]
        }
      ]
    }
  ]
}
```

### Handling Deprecated Items

When `deprecatedLast: true` is set, deprecated items are moved to the end while maintaining alphabetical order within each group:

```javascript
const sortedManifest = sortCem(manifest, {
  deprecatedLast: true,
});
```

**Result**: Non-deprecated items first (alphabetically), then deprecated items (alphabetically).

## Performance

The sorter is designed to be fast and efficient. For reference, sorting a large manifest (100+ components) typically takes around 10 milliseconds.

## TypeScript Support

This package is written in TypeScript and includes full type definitions. All functions and options are properly typed for the best development experience.

```typescript
import { sortCem, CemSorterOptions } from "@wc-toolkit/cem-sorter";
import type * as cem from "custom-elements-manifest";

const options: CemSorterOptions = {
  deprecatedLast: true,
  debug: false,
};

const sortedManifest: cem.Package = sortCem(manifest, options);
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.
