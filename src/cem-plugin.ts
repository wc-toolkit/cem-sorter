/* eslint-disable @typescript-eslint/no-explicit-any */
import { sortCem } from "./cem-sorter";
import type { CemSorterOptions } from "./cem-sorter";

/**
 * Plugin to sort custom elements manifest.
 * 
 * @param options - Configuration options for the CEM sorter plugin
 * @returns 
 */
export function cemSorterPlugin(options: CemSorterOptions = {}) {
  options.fileName = null;
  return {
    name: "@wc-toolkit/cem-sorter",
    packageLinkPhase({ customElementsManifest }: any) {
      return sortCem(customElementsManifest, options);
    },
  };
}
