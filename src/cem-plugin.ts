/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import { sortCem } from "./cem-sorter";
import type { CemSorterOptions } from "./cem-sorter";
import { DEFAULT_SORT_OPTIONS } from "./default-options";

/**
 * Plugin to sort custom elements manifest.
 *
 * @param options - Configuration options for the CEM sorter plugin
 * @returns
 */
export function cemSorterPlugin(options: CemSorterOptions = {}) {
  const hasExplicitFileName = Object.hasOwn(options, "fileName");
  const conflictWithDefaultOutput =
    typeof options.fileName === "string" &&
    path.basename(options.fileName).toLowerCase() ===
      DEFAULT_SORT_OPTIONS.fileName.toLowerCase();

  if (conflictWithDefaultOutput) {
    console.warn(
      `[cem-sorter] Skipping plugin file output because ${DEFAULT_SORT_OPTIONS.fileName} is managed by CEM Analyzer`,
    );
  }

  const pluginOptions = {
    ...options,
    fileName:
      !hasExplicitFileName || conflictWithDefaultOutput
        ? null
        : options.fileName,
  };
  return {
    name: "@wc-toolkit/cem-sorter",
    packageLinkPhase({ customElementsManifest }: any) {
      return sortCem(customElementsManifest, pluginOptions);
    },
  };
}
