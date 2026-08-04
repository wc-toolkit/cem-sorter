import type { CemSorterOptions } from "./cem-sorter.js";

/**
 * Default sort options
 */
export const DEFAULT_SORT_OPTIONS = {
  fileName: "custom-elements.json",
  outdir: "./",
  deprecatedLast: false,
  customFields: [],
  debug: false,
  skip: false,
} satisfies CemSorterOptions;
