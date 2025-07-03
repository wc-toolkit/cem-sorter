/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as cem from "custom-elements-manifest";
import { Logger } from "./logger.js";

/**
 * Options for sorting custom elements manifest properties
 */
export interface SortOptions {
  /** Move deprecated APIs to the end of their respective lists */
  deprecatedLast?: boolean;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Default sort options
 */
const DEFAULT_SORT_OPTIONS: SortOptions = {
  deprecatedLast: false,
  debug: false,
};

/**
 * Sorts the properties of a custom elements manifest alphabetically
 *
 * @param manifest - The custom elements manifest to sort
 * @param options - Options for sorting specific properties
 * @returns A new manifest with sorted properties
 */
export function sortCustomElementsManifest(
  manifest: unknown,
  options: SortOptions = {}
): cem.Package {
  const mergedOptions = { ...DEFAULT_SORT_OPTIONS, ...options };
  const log = new Logger(mergedOptions.debug);

  log.cyan("[cem-sorter] Starting to sort custom elements manifest");
  log.blue(`[cem-sorter] Options: ${JSON.stringify(mergedOptions, null, 2)}`);

  // Create a deep copy of the manifest to avoid mutating the original
  const sortedManifest = JSON.parse(JSON.stringify(manifest)) as cem.Package;

  /**
   * Helper function to sort arrays with optional deprecated item handling
   */
  const sortWithDeprecated = <
    T extends { name?: string; deprecated?: boolean | string },
  >(
    items: T[]
  ): T[] => {
    return items.sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";

      if (mergedOptions.deprecatedLast) {
        const aDeprecated = Boolean(a.deprecated);
        const bDeprecated = Boolean(b.deprecated);

        // If one is deprecated and the other isn't, put deprecated last
        if (aDeprecated && !bDeprecated) return 1;
        if (!aDeprecated && bDeprecated) return -1;
      }

      // Both have same deprecated status, sort alphabetically
      return nameA.localeCompare(nameB);
    });
  };

  // Sort modules
  if (sortedManifest.modules) {
    log.blue(`[cem-sorter] Sorting ${sortedManifest.modules.length} modules`);

    sortedManifest.modules = sortedManifest.modules.sort((a: any, b: any) => {
      const pathA = a.path || "";
      const pathB = b.path || "";
      return pathA.localeCompare(pathB);
    });

    // Process each module
    sortedManifest.modules.forEach((module: any, moduleIndex: number) => {
      log.blue(
        `[cem-sorter] Processing module ${moduleIndex + 1}: ${module.path || "unnamed"}`
      );

      // Sort exports
      if (module.exports) {
        log.yellow(`[cem-sorter]   Sorting ${module.exports.length} exports`);
        module.exports = sortWithDeprecated(module.exports);
      }

      // Sort declarations
      if (module.declarations) {
        log.yellow(
          `[cem-sorter]   Sorting ${module.declarations.length} declarations`
        );
        module.declarations = sortWithDeprecated(module.declarations);
      }

      // Process each declaration
      if (module.declarations) {
        module.declarations.forEach((declaration: any) => {
          log.green(
            `[cem-sorter]     Processing declaration: ${declaration.name || "unnamed"} (${declaration.kind || "unknown"})`
          );

          // Sort members (attributes, properties, methods, events, etc.)
          if (declaration.members) {
            log.magenta(
              `[cem-sorter]       Sorting ${declaration.members.length} members`
            );

            // Sort method parameters
            declaration.members.forEach((member: any) => {
              if (member.kind === "method" && member.parameters) {
                log.cyan(
                  `[cem-sorter]         Sorting parameters for method: ${member.name}`
                );
                member.parameters = sortWithDeprecated(member.parameters);
              }
            });

            // Sort all members by name with deprecated handling
            declaration.members = sortWithDeprecated(declaration.members);
          }

          // Sort other arrays that might exist on declarations
          const arrayProps = [
            "attributes",
            "events",
            "slots",
            "cssCustomProperties",
            "cssParts",
            "cssStates",
            "dependencies",
          ];

          arrayProps.forEach((prop) => {
            if (
              (declaration as any)[prop] &&
              Array.isArray((declaration as any)[prop])
            ) {
              const items = (declaration as any)[prop];
              log.magenta(`[cem-sorter]       Sorting ${items.length} ${prop}`);
              (declaration as any)[prop] = sortWithDeprecated(items);
            }
          });
        });
      }
    });
  }

  log.green("[cem-sorter] Finished sorting custom elements manifest");
  return sortedManifest;
}
